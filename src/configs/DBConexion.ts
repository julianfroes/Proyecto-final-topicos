import { ConfigModule, ConfigService } from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { Cliente } from "src/entities/cliente.entity";
import { Consumo } from "src/entities/consumo.entity";
import { Pago } from 'src/entities/pago.entity';

export const Connection = TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot()],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Cliente, Consumo, Pago],
        synchronize: true
    }),
    inject: [ConfigService],
})