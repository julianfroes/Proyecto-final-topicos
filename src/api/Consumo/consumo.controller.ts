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

            if (typeof(params.consumo) != 'number') {
                return 'Consumo no valido';
            }
            if (typeof(params.id_cliente) != 'number') {
                return 'id no valido';
            }


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

    
    
}
