import { IConsumo } from './../../models/Consumo';
import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ConsumoService } from './consumo.service';
import { valiOnlyNum, valiOnlyNumDec } from 'src/Regex func/validations';

@Controller('consumo')
export class ConsumoController {
    constructor( 
            private consumoService : ConsumoService
        ){}

    @Post()
    Create(@Body() params : IConsumo){
        var mensaje = "";
        var parametromalIngresado = false;
        if(!valiOnlyNumDec(params.consumo)){
            mensaje+= 'Consumo debe ser solo numerico \n';
            parametromalIngresado = true;
        }if(params.consumo <= 0){
            mensaje+= 'Consumo debe ser mayor a 0 \n';
            parametromalIngresado = true;
        }
        if(!valiOnlyNum(params.id_cliente) || params.id_cliente<=0){
            mensaje+= 'id no valida \n';
            parametromalIngresado = true;
        }
        if(parametromalIngresado){
            throw new BadRequestException({ cause: "Consumo mal ingresado", description: mensaje })
        }
        else{
            try {
                return this.consumoService.create(params);
            } catch (error) {
                throw new BadRequestException({ cause: "Consumo mal ingresado", description: error })
                
            }
        }
        
    }

    @Get()
    getReporteConsumo(){
        try {
            return this.consumoService.getAll();
        } catch (error) {
            throw new BadRequestException({ cause: "ERROR", description: error })
        }
    }

    @Get('/reportesconsumoGet')
    getConsumos(){
        try {
            return this.consumoService.reporteTodoslosConsumos();
        } catch (error) {
            throw new BadRequestException({ cause: "ERROR en reporte", description: error })
        }
    }

    
    
}
