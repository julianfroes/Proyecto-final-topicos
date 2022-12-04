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

<<<<<<< HEAD
    //Obtener todos los clientes y consumo
    @Get()
    getAll(){
        try {
            this.clienteService.getAll();
        } catch (error) {
            console.log(`Error: ${error}`);
=======
    //este funciona
    @Get('/nuevoGet')
    getCliente(){
        return this.clienteService.findAll();
    }
    @Get('/mayormenor')
    getReportemayormenor(){
        try {
            return this.clienteService.getMenoryMenorConsumo();
        } catch (error) {
            console.log(error);
            
        }
    }
    @Get('/clientesPagopagado')
    getClientesPagoS(){
        try {
            return this.clienteService.getYaPagaron();
        } catch (error) {
            console.log(error);
            
        }
    }
    @Get('/clientesPagoPendiente')
    getClientesPagoD(){
        try {
            return this.clienteService.getPagoPendiente();
        } catch (error) {
            console.log(error);
            
>>>>>>> ActualizarPago
        }
    }


}