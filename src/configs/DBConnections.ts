import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from '../entities/cliente.entity';



export const Connection = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'ith-db',
    entities: [Cliente],
    synchronize: true

})