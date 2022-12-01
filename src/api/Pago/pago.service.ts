import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/entities/pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagoService {
    constructor( @InjectRepository(Pago) private pagoRepo : Repository< Pago >){}

    async create(idConsumo: number, tot: number){
        // const direccionidconsumo = data.id_consumo;
        const consumo = await this.pagoRepo.save({
            id:null,
            id_consumo: idConsumo,
            total: tot,
            pagado: false
        });

    }

    
}

