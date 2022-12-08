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

            const nombreExp = new RegExp(/^[a-zA-ZÀ-ÿ\s]{4,40}$/);
            const correoExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            const domicilioExp= new RegExp(/[a-zA-ZÀ-ÖØ-öø-ÿ\s]{5,50}$/);
            const telefonoExp = new RegExp(/^[0-9]{10,}$/);
            const fechaExp = new RegExp(/([0-9]{4,})([-])([0-9]{2,})([-])([0-9]{2,})/);
        

        try {
            if(cliente.nombre&&cliente.correo&&cliente.domicilio&&cliente.telefono&&cliente.fecha_nacimiento){
                //Valor de true o false dependiendo si cumplen con el formato
                let nombreCliente = nombreExp.test(cliente.nombre);
                let correoCliente = correoExp.test(cliente.correo);
                let domicilio = domicilioExp.test(cliente.domicilio);
                let telefono = telefonoExp.test(cliente.telefono);
                let fechaNacimiento = fechaExp.test(String(cliente.fecha_nacimiento));

                //Falta mostar mensajes de error en caso de ser false
                
                return await this.clienteEntity.insert(cliente);
            
            }else{
                // throw new BadRequestException({ cause: new Error(), description: "Faltan datos de cliente por ingresar" })
                throw new Error("Faltan datos de cliente por ingresar");
            }
        } catch (error) {
            // throw new BadRequestException({ cause: new Error(), description: "Faltan datos de cliente por ingresar" })
            throw new Error("Faltan datos de cliente por ingresar " + error);
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

}

    


