import { IConsumo } from './../../models/Consumo';
import { Body, Controller, Post } from '@nestjs/common';
import { ConsumoService } from './consumo.service';

@Controller('venta')
export class ConsumoController {
    constructor( private consumoService : ConsumoService ){
    }

    @Post()
    Create(@Body() params : IConsumo ){
        try {
            return this.consumoService.create(params)
        } catch (error) {
            console.log(error)
        }
    }
}
