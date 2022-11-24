import { PagoService } from './../pago/pago.service';
import { IConsumo } from './../../models/Consumo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumo } from 'src/entities/consumo.entity';

@Injectable()
export class ConsumoService {
    constructor( 
        @InjectRepository(Consumo) private consumoEntity : Repository< Consumo >, 
        private pagoService : PagoService ){
    }
    //tampoco estoy muy seguro de este metodo
    /*
    async create( consumo : IConsumo ){
        const date = new Date();
        let totalConsumo = 0;
        //aqui calculamos el totalConsumo
        consumo.pago.forEach(item =>{
            totalConsumo = totalConsumo + ( item.total )
        })
        const response = await this.consumoEntity.save({
            id_cliente : consumo.id,
            fecha : date,
            pago : totalConsumo
        })
        //registro del detalle
        await this.pagoService.agregar_pago(consumo.pago )
    }*/

}