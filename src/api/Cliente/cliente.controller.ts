import { Body, Controller, Get, Post } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { ICliente } from '../../models/Cliente';


@Controller('cliente')
export class ClienteController{
    constructor(
        private clienteService : ClienteService
        ){}

    @Post()
    Create(@Body() params : ICliente){
        this.clienteService.create(params);
        return true
    }

    //Obtener todos los clientes y consumo
    @Get('/all')
    getClientes(): ICliente[]{
        return this.clienteService.getAll();
    }

    //TODO Pendiente obtener los clientes con mayor consumo
    @Get('')
    getCliente(){

    }

}