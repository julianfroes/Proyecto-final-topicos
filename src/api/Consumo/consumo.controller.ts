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

    /*@Post()
    Create(@Body() params : IConsumo ){
        try {
            return this.consumoService.create(params)
        } catch (error) {
            console.log(error)
        }
    }*/
    
}
