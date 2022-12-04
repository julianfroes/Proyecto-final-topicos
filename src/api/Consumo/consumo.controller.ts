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

    //TODO Es necesario?
    // @Post('/consumocliente')
    // agregar_consumo(@Body() params: IConsumo){
    //     return this.consumoService.agregar_consumo(params);
    // }

    @Get()
    getReporteConsumo(){
        try {
            this.consumoService.getAll();
        } catch (error) {
            console.log(`Error: ${error}`);
        }
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
