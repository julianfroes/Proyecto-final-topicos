import { IConsumo } from './../../models/Consumo';
import { Body, Controller, Post } from '@nestjs/common';
import { ConsumoService } from './consumo.service';
import { Consumo } from 'src/entities/consumo.entity';
import { PagoService } from '../Pago/pago.service';

@Controller('consumo')
export class ConsumoController {
    constructor( private consumoService : ConsumoService,
                 /*private pagoService : PagoService */)
    {}

    @Post()
    Create(@Body() params : Consumo): string | boolean{
        this.consumoService.create(params);
        return true
    }
    
    
    @Post('/consumocliente')
    agregar_consumo(@Body() body: any){
        return this.consumoService.agregar_consumo(body);
    }

/*    @Post()
    Create(@Body() params : IConsumo ){
        try {
            return this.consumoService.create(params)
        } catch (error) {
            console.log(error)
        }
    }*/
    
}
