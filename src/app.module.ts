import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import{ Connection } from './configs/DBConexion';
import{ ClienteModule } from './api/Cliente/cliente/cliente.module';
import { ConsumoModule } from './api/Consumo/consumo.module';
import { PagoModule } from './api/Pago/pago.module';


@Module({
  imports: [Connection,ClienteModule,ConsumoModule,/*PagoModule    Por alguna razon este modulo da error y no se puede mapear*/],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
