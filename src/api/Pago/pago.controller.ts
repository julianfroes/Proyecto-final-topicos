import { Body,Controller, Post } from '@nestjs/common';
import { PagoService } from './pago.service';
import {Pago} from 'src/entities/pago.entity';
import { ConsumoService } from '../Consumo/consumo.service';

@Controller('Pago')
export class PagoController {
    constructor(private pagoService: PagoService,
        private consumoService: ConsumoService){}
    @Post()
    agregar_pago(@Body() body: any){
        return this.pagoService.agregar_pago(body);
    }
}