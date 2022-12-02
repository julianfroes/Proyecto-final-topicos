import { Body,Controller, Get, Post } from '@nestjs/common';
import { PagoService } from './pago.service';
import {Pago} from 'src/entities/pago.entity';
import { ConsumoService } from '../Consumo/consumo.service';
import { IPago } from 'src/models/Pago';


@Controller('pago')
export class PagoController {
    constructor(private pagoService: PagoService,
        private consumoService: ConsumoService){}
    @Post()
    Create(@Body() params: IPago){
         return this.pagoService.pagarPago(params.id,params.total);
    }


}