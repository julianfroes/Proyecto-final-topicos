import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Consumo } from './consumo.entity';

@Entity()
export class Pago{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => Consumo, (consumo) => consumo.pago)
    @JoinColumn({ name: 'id_consumo'})
    id_consumo : number;

    @Column()
    total : number;

    @Column()
    pagado : boolean;



}