import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    providers: [ClienteService],
    controllers: [ClienteController],
    exports: [TypeOrmModule]
})
export class ClienteModule {}