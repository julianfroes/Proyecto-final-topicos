import {TypeOrmModule} from "@nestjs/typeorm";
import { Cliente } from "src/entities/cliente.entity";
import { Consumo } from "src/entities/consumo.entity";
import { Pago } from 'src/entities/pago.entity';

export const Connection = TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Cliente, Consumo, Pago],
    synchronize: true
})