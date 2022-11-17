import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cliente as ClienteEntity, Cliente } from '../../entities/cliente.entity';
import { ICliente } from '../../models/Cliente';



@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(ClienteEntity)
        private clienteEntity : Repository<ClienteEntity>
    ){}
    private readonly Clientes: Cliente[] = [];

    async create( cliente : ICliente){
        return await this.clienteEntity.insert(cliente);
    }

    getAll(): ICliente[]{
        return this.Clientes;
    }
}

