import { ICliente } from './../../../models/Cliente';
import { IConsumo } from 'src/models/Consumo';
import { Cliente as ClienteEntity } from '../../../entities/cliente.entity';
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { Consumo } from 'src/entities/consumo.entity';


@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(ClienteEntity) private clienteEntity : Repository<ClienteEntity>,
        @InjectRepository(Consumo) private consumoEntity : Repository<Consumo>
    ){}

    async create( cliente : ICliente){
        try {
         await this.clienteEntity.insert(cliente);
         return "Cliente registrado con exito";
        } catch (error) {
            throw new BadRequestException({ cause: "Error al insertar el cliente", description: error })
        }
        
    }

    //NO TOCAR reporte clientes con sus consumos
    findAll(){
        return this.clienteEntity.find({relations:['consumo']});
    }

    async getMenoryMenorConsumo() {
        let mayorConsumo = 0;
        let menorConsumo = 100000;
        let consumosEncontrados = await this.consumoEntity.find({
            where:{
                consumo : MoreThan(mayorConsumo)
            }
        })
        consumosEncontrados.forEach( Consumo => {
            if(mayorConsumo < Consumo.consumo){mayorConsumo = Consumo.consumo}
            if(menorConsumo > Consumo.consumo){menorConsumo = Consumo.consumo}
        });
        
        const clientequemasconsumio = await this.clienteEntity.findOne({
            select:{
                id:true,
                nombre: true
            },
            relations:{
                consumo:true
            },
            where:{
                consumo:{
                    consumo : mayorConsumo,                           
                    }
                },
        })
        const clientequemenosconsumio = await this.clienteEntity.findOne({
            select:{
                id:true,
                nombre: true
            },
            relations:{
                consumo:true
            },
            where:{
                consumo:{
                    consumo : menorConsumo
                    }
                },
        })
        const clientesReporte = [clientequemenosconsumio,clientequemasconsumio]
        return clientesReporte;

    }
    async getYaPagaron() {
        let clientesEncontrados = await this.clienteEntity.find({
            where:{
                consumo:{
                    pago: {
                        pagado: true
                    }
                }
            }
        })
        return clientesEncontrados;
    }

    async getPagoPendiente(){
        let clientesEncontrados = await this.clienteEntity.find({
            where:{
                consumo:{
                    pago:{
                        pagado: false
                    }
                }
            }
        })
        return clientesEncontrados;
    }

    async getById(id : number){
       let clienteEncontrado = await this.clienteEntity.find({
        where:{
            id: id
        }

       })
       if (clienteEncontrado) {
        return clienteEncontrado;
       }else{
        return 'Id de usuario no existe';
       }
    }

}

    


