
import { PagoService } from './../Pago/pago.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Consumo } from 'src/entities/consumo.entity';
import { ConsumoController } from './consumo.controller';
import { ConsumoService } from './consumo.service';
import { Pago } from 'src/entities/pago.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Consumo, Pago])],
    providers: [ConsumoService, PagoService], //servicio para las consultas a la BD
    controllers: [ConsumoController],
    exports: [TypeOrmModule]
})
export class ConsumoModule {}