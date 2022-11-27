import { Body, Controller, Get, Post } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { Cliente } from 'src/models/Cliente';


@Controller('cliente')
export class ClienteController{
    constructor(
        private clienteService : ClienteService
        ){}

    @Post()
    Create(@Body() params : Cliente): string | boolean{
        this.clienteService.create(params);
        return true
    }

    //Obtener todos los clientes y consumo
    @Get('/all')
    getClientes(): Cliente[]{
        return this.clienteService.getAll();
    }

    //TODO Pendiente obtener los clientes con mayor consumo
    @Get('/nuevo')
    getCliente(): any{
        return this.clienteService.findAll();
    }

}