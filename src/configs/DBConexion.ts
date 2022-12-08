import { ConfigModule, ConfigService } from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { Cliente } from "src/entities/cliente.entity";
import { Consumo } from "src/entities/consumo.entity";
import { Pago } from 'src/entities/pago.entity';

export const Connection = TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot()],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'consumoBD',
        entities: [Cliente, Consumo, Pago],
        synchronize: false
    }),
    inject: [ConfigService],
})