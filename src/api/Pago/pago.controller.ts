import { Controller, Post } from '@nestjs/common';
import { PagoService } from './pago.service';
import { ConsumoService } from '../Consumo/consumo.service';
import { IPago } from 'src/models/Pago';


@Controller('pago')
export class PagoController {
    constructor(private pagoService: PagoService,
        private consumoService: ConsumoService){}
    // @Post()
    // Create(@Body() params: IPago){
    //     return this.pagoService.create(params);
    // }

    // @Post()
    // Create (params: IPago) {
    //     return this.pagoService.actualizar(params.id_consumo, params.total);
    // }

}