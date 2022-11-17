import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from './cliente.entity';


@Entity()
export class Consumo{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    fecha : Date;

    @Column()
    consumo : number;

    @ManyToOne(() => Cliente, (cliente) => cliente.id)
    id_cliente : number;


}