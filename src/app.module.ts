import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './api/Cliente/cliente.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from './configs/DBConnections';




@Module({
  imports: [ConfigModule.forRoot({
    envFilePath : process.env.NODE_ENV === 'docker' ? '.env' : '.env.local'
  }), Connection, ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
