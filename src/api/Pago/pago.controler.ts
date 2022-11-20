import { Body,Controller, Post } from '@nestjs/common';
import { PagoService } from './pago.service';

@Controller('Pago')
export class DetailsController {
    constructor(private pagoService: PagoService){}
    @Post()
    agregar_pago(@Body() body: any){
        return this.pagoService.agregar_pago(body);
    }
}