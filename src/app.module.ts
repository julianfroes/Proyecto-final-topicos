import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import{ Connection } from './configs/DBConexion';
import{ ClienteModule } from './api/Cliente/cliente/cliente.module';


@Module({
  imports: [Connection,ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
