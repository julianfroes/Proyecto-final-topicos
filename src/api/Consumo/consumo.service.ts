//import { PagoService } from './../pago/pago.service';
import { IConsumo } from './../../models/Consumo';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumo } from 'src/entities/consumo.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { PagoService } from '../Pago/pago.service';
import { Pago } from '../../entities/pago.entity';

@Injectable()
export class ConsumoService {
    constructor(
        @InjectRepository(Consumo) private consumoEntity: Repository<Consumo>,
        @InjectRepository(Cliente) private clienteEntity: Repository<Cliente>,
        @InjectRepository(Pago) private pagoEntity: Repository<Pago>,
        private pagoService: PagoService,
    ) {

    }
    //Se crea consumo y se calculan precios por rangos
    async create(consumo: IConsumo): Promise<boolean> {
        //primero se busca el cliente con el id que se manda en el request
        const direccionIDcliente = consumo.id_cliente;
        const cliente = await this.clienteEntity.findOne({
            where: { id: direccionIDcliente },
        });
        if (!cliente) {
            //aqui entra cuando no encuentra falta algun tipo de mensaje
            console.log("Id de cliente no encontrada o no valida");
            return false;
        }
        else {
            if (consumo.consumo > 0) {//aqui se verifica que el consumo se valido mayor a 0
                const fechaNaCliente = cliente.fecha_nacimiento;//aca es de donde se saca la fecha de nacimiento del cliente
                const date = new Date();
                const kw = consumo.consumo;
                let edad = this.calcularEdad(fechaNaCliente);
                let total = this.calcularTotalPgar(kw, edad);

                const newConsumo = await this.consumoEntity.save({
                    fecha: date,
                    consumo: kw,
                    id_cliente: consumo.id_cliente

                }).then((res) => {
                    this.pagoService.create(res.id, total).then((res) =>
                        console.log(res))
                        .catch((error) => {
                            throw new BadRequestException({ cause: new Error(), description: error })
                        })
                }).catch((error) => {
                    throw new BadRequestException({ cause: new Error(), description: error })
                })
                return true;
            }
            else {
                //aqui seria mandar un mensaje de error en el consumo
                throw new Error("Cantidad de consumo no valida");
                
                return false;
            }
        }
    }

    //Obtener registro de consumo y su respectivo pago
    getAll() {
        return this.consumoEntity.find({
            relations: ['id_cliente', 'pago.id_consumo']
        })
    }

    calcularEdad = (fecha) => {
        const date = new Date();
        let birthday = new Date(fecha);
        let edad = date.getFullYear() - birthday.getFullYear();
        let mes = date.getMonth() - birthday.getMonth();

        if (mes < 0 || (mes === 0 && date.getDate() < birthday.getDate())) {
            edad--;
        }
        return edad;
    }
    calcularTotalPgar = (kw, edad) => {
        let total = 0;
        if (kw > 0 && kw <= 100) {
            total = kw * 150;
        } else if (kw >= 101 && kw <= 300) {
            total = kw * 170;
        } else if (kw > 300) {
            total = kw * 190;
        }
        if (edad > 50) {
            let nuevoTotal = total - (total * 0.1);
            total = nuevoTotal;
        }
        return total;
    }

    //Reporte de todos los consumos
    reporteTodoslosConsumos() {
        return this.consumoEntity.find({ relations: ['pago'] });
    }

}