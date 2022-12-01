import { IConsumo } from './../../models/Consumo';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsumoService } from './consumo.service';

@Controller('consumo')
export class ConsumoController {
    constructor( 
            private consumoService : ConsumoService
        ){}

    @Post()
    Create(@Body() params : IConsumo){
        try {
            this.consumoService.create(params);
        } catch (error) {
            console.log(`Error: ${error}`);
            
        }
    }

    @Post('/pagar')
    pagarConsumo(@Body() params: IConsumo){
        try {
            this.consumoService.pagarConsumo(params);
        } catch (error) {
            console.log(error);
            
        }
    }

    @Get()
    getReporteConsumo(){
        try {
            return this.consumoService.getAll();
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    @Get('/reportesconsumoGet')
    getConsumos(){
        return this.consumoService.reporteTodoslosConsumos();
    }

    
    
}
