import { BadRequestException, Body, Controller, Get, Param, Post, PreconditionFailedException } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { valiBirthdate, valiMail, valiCel, valiName } from 'src/Regex func/validations';
import { ICliente } from 'src/models/Cliente';


@Controller('cliente')
export class ClienteController{
    constructor(
        private clienteService : ClienteService
        ){}

    @Post()
    Create(@Body() params : ICliente){
        //Validacion????
        var mensaje = "";
        var parametromalIngresado = false;
        if ((params.correo||params.domicilio||params.fecha_nacimiento||params.nombre||params.telefono) !== null) {
            if (!valiName(params.nombre)) {
                mensaje+= 'Nombre no valido \n';
                parametromalIngresado = true;
            }
            if (!valiMail(params.correo)) {
                mensaje+= 'Correo no valido \n';
                parametromalIngresado = true;
            }
            if (typeof(params.domicilio) != 'string') {
                mensaje+= 'Domicilio no valido \n';
                parametromalIngresado = true;
            }
            if (!valiBirthdate(params.fecha_nacimiento)) {
                mensaje+= 'Fecha no valida \n';
                parametromalIngresado = true;
            }
            if (!valiCel(params.telefono)) {
                mensaje+= 'Telefono no valido \n';
                parametromalIngresado = true;
            }
            if(parametromalIngresado){throw new BadRequestException({ cause: "Campos de cliente mal ingresado/s", description: mensaje});}
            else{
                try {
                    return this.clienteService.create(params);
                } catch (error) {
                    return new BadRequestException({ cause: new Error(), description: error })
                } 
                
            }
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
    @Get('/:id')
    getClienteId(@Param('id') param): any{
        return this.clienteService.getById(param);

    }
    


}


