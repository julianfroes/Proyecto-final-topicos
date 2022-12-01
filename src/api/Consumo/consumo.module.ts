import { Consumo } from 'src/entities/consumo.entity';
import { ConsumoController } from './consumo.controller';
import { ConsumoService } from './consumo.service';
import { Pago } from 'src/entities/pago.entity';
import { PagoService } from '../Pago/pago.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([Consumo,Pago])],
    providers: [ConsumoService,PagoService], //Se cambio ClienteService por PagoService 
    controllers: [ConsumoController],//ClienteController se usa?],
    exports: [TypeOrmModule]
})
export class ConsumoModule {}