import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/entities/pago.entity';
import {Consumo} from 'src/entities/consumo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagoService {
    constructor( @InjectRepository(Pago) private pagoRepo : Repository< Pago >,
                 @InjectRepository(Consumo) private consumoRepo : Repository< Consumo >,){

    }
    /*async agregar_pago(data : any){

        detalles.forEach((element : IPago) => {
            // this.detailsEntity.insert(element)
            this.pagoEntity.insert( {
                total : element.total,
                pagado : element.pagado,
                id_consumo : id_consumo
            } )
        });
    }
    */
   /*
    async agregar_pago(data : any){

        const consumo = await this.consumoRepo.findOne(data.id_consumo);
        if(!consumo){
            throw new NotFoundException('no se encontro el consumo');
        }
        const newPago = new Pago();
        newPago.consumo = consumo;
        newPago.pagado = data.pagado;
        newPago.total = data.total;
        return this.pagoRepo.save(newPago);

    }
    */
    async agregar_pago(data : any){
        const direccionidconsumo = data.idconsumo;
        const consumo = await this.consumoRepo.findOne({
            where:{
                id:direccionidconsumo
            },
        });
        if(!consumo){
            throw new NotFoundException('no se encontro el consumo');
        }
        const newPago = new Pago();
        newPago.consumo = consumo;
        newPago.pagado = data.pagado;
        newPago.total = data.total;
        return this.pagoRepo.save(newPago);

    }

    
}

