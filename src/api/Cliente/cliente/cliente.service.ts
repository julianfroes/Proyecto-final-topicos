import { Cliente } from './../../../models/Cliente';
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
    private readonly Clientes: Cliente[] = [];

    async create( cliente : Cliente){
        return await this.clienteEntity.insert(cliente);
    }

    getAll(): Cliente[]{
        return this.Clientes;
    }
}

