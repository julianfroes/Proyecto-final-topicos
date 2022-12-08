import { BadRequestException, Body,Controller, Get, Post } from '@nestjs/common';
import { PagoService } from './pago.service';
import {Pago} from 'src/entities/pago.entity';
import { ConsumoService } from '../Consumo/consumo.service';
import { IPago } from 'src/models/Pago';
import { valiOnlyNum, valiOnlyNumDec } from 'src/Regex func/validations';


@Controller('pago')
export class PagoController {
    constructor(private pagoService: PagoService,
        private consumoService: ConsumoService){}
    @Post()
    Create(@Body() params: IPago){
        var mensaje = "";
        var parametromalIngresado = false;
        if(!valiOnlyNum(params.id)){
            mensaje+= 'Id del pago debe ser numerico \n';
            parametromalIngresado = true;
        }
        if(!valiOnlyNumDec(params.total)){
            mensaje+= 'el pago debe ser numerico entero o decimal \n';
            parametromalIngresado = true;
        }
        if(parametromalIngresado){
            throw new BadRequestException({ cause: "Pago mal ingresado", description: mensaje })
        }
        else{
            try {
                return this.pagoService.pagarPago(params.id,params.total);
            } catch (error) {
                throw new BadRequestException({ cause: "ERROR Pago", description: error })
                
            }
        }
        
         
    }


}