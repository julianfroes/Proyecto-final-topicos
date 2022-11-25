
//import { PagoService } from './../Pago/pago.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { Consumo } from 'src/entities/consumo.entity';
import { Cliente } from 'src/entities/cliente.entity';

import { ConsumoController } from './consumo.controller';


import { ConsumoService } from './consumo.service';
import { ClienteService } from '../Cliente/cliente/cliente.service';
import { ClienteController } from '../Cliente/cliente/cliente.controller';


@Module({
imports: [TypeOrmModule.forFeature([Consumo,Cliente])],
    providers: [ConsumoService,ClienteService],
    controllers: [ConsumoController,ClienteController],
    exports: [TypeOrmModule]
})
export class ConsumoModule {}