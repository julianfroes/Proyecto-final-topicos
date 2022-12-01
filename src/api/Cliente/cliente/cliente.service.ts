import { ICliente } from './../../../models/Cliente';
import { Cliente as ClienteEntity } from '../../../entities/cliente.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(ClienteEntity)
        private clienteEntity : Repository<ClienteEntity>
    ){}
    private readonly Clientes: ICliente[] = [];

    async create( cliente : ICliente){
        return await this.clienteEntity.insert(cliente);
    }
    //ya sirve pero solo devuelve los clientes
    // getAll(): Promise<ClienteEntity[]>{
    //      return 
    // }
    //NO TOCAR reporte clientes con sus consumos
    findAll(){
        return this.clienteEntity.find({relations:['consumo']});
    }

    getYaPagaron(){
        const ultimoCliente = this.clienteEntity.find()

    }

    
}

