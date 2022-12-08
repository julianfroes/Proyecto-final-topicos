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
            if ((params.correo||params.domicilio||params.fecha_nacimiento||params.nombre||params.telefono) !== null) {
                if (typeof(params.nombre) != 'string') {
                    return 'Nombre no valido';
                }
                if (typeof(params.correo) != 'string') {
                    return 'Correo no valido';
                }
                if (typeof(params.domicilio) != 'string') {
                    return 'Domicilio no valido';
                }
                if (typeof(params.fecha_nacimiento) != 'string') {
                    return 'Fecha no valida';
                }
                if (typeof(params.telefono) != 'string') {
                    return 'Telefono no valido';
                }
                this.clienteService.create(params);
            }            
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

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
            
        }
    }


}