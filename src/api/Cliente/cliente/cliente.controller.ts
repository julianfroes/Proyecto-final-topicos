import { Body, Controller, Get, Post } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { ICliente } from 'src/models/Cliente';


@Controller('cliente')
export class ClienteController{
    constructor(
        private clienteService : ClienteService
        ){}

    @Post()
    Create(@Body() params : ICliente){
        try {
            this.clienteService.create(params);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    //Obtener todos los clientes y consumo
    //este no funciona
    @Get()
    getAll(){
        try {
             return this.clienteService.getAll();
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    //este funciona
    @Get('/nuevoGet')
    getCliente(){
        return this.clienteService.findAll();
    }
    @Get('/clientesPagopagado')
    getClientesPagoS(){
        //return this.clienteService.funcionYaPagaron();
    }
    @Get('/clientesPagopendiente')
    getClientesPagoD(){
        //return this.clienteService.funcionNohanPagado();
    }

    //TODO Pendiente obtener los clientes con mayor consumo
    // @Get('/nuevo')
    // getCliente(): any{
    //     return this.clienteService.findAll();
    // }

}