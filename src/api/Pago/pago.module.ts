import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { Consumo } from 'src/entities/consumo.entity';
import { Pago } from 'src/entities/pago.entity';

import { ConsumoController } from './../Consumo/consumo.controller';
import { PagoController} from './../Pago/pago.controller';

import { ConsumoService } from './../Consumo/consumo.service';
import { PagoService } from './../Pago/pago.service';


@Module({
imports: [TypeOrmModule.forFeature([Pago,Consumo])],
    providers: [PagoService,ConsumoService], //servicio para las consultas a la BD
    controllers: [PagoController,ConsumoController],
    exports: [TypeOrmModule]
})
export class PagoModule {}