import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Consumo } from './consumo.entity';

@Entity()
export class Pago{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    total : number;

    @Column()
    pagado : boolean;

    @ManyToOne(() => Consumo, (consumo) => consumo.pago)
    @JoinColumn({ name: 'id_consumo'})
    consumo : Consumo;



}