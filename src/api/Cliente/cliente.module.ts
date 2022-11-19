import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../../entities/cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Module } from '@nestjs/common';


@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    providers: [ClienteService],
    controllers: [ClienteController],
    exports: [TypeOrmModule]
})

export class ClienteModule {}