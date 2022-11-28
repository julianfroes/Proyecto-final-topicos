import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/entities/pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagoService {
    constructor( @InjectRepository(Pago) private pagoRepo : Repository< Pago >,){}

    async create(id_consumo: number, total: number){
        // const direccionidconsumo = data.id_consumo;
        const consumo = await this.pagoRepo.insert({
            id_consumo: id_consumo,
            total: total,
            pagado: false
        });

    }

    
}

