import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import{ Connection } from './configs/DBConexion';
import{ ClienteModule } from './api/Cliente/cliente/cliente.module';
import { ConsumoModule } from './api/Consumo/consumo.module';
import { PagoModule } from './api/Pago/pago.module';
import { ClienteService } from './api/Cliente/cliente/cliente.service';
import { ConsumoService } from './api/Consumo/consumo.service';
import { PagoService } from './api/Pago/pago.service';
import {ConfigModule} from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV === 'docker' ? '.env' : '.local.env' }),
  Connection, ClienteModule, ConsumoModule, PagoModule],
  controllers: [AppController],
  providers: [AppService,ClienteService,ConsumoService,PagoService],
})
export class AppModule {}
