//import { PagoService } from './../pago/pago.service';
import { IConsumo } from './../../models/Consumo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumo } from 'src/entities/consumo.entity';
import { Pago } from 'src/entities/pago.entity';
import { Cliente } from 'src/entities/cliente.entity';

@Injectable()
export class ConsumoService {
    constructor( 
        @InjectRepository(Consumo) private consumoEntity : Repository< Consumo >/*, 
        private pagoService : PagoService */
        /*LO NUEVO */,@InjectRepository(Cliente) private clienteEntity : Repository< Cliente >,
                 @InjectRepository(Consumo) private consumoRepo : Repository< Consumo >,
        
        ){
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
    async create(consumo : Consumo){

        return await this.consumoEntity.insert(consumo);
    }
    async agregar_consumo(data : any){
        const direccionIDcliente = data.idconsumo;
        const cliente = await this.clienteEntity.findOne({
            where:{
                id:direccionIDcliente
            },
        });
        if(!cliente){
            throw new NotFoundException('no se encontro el cliente');
        }
        const newConsumo = new Consumo();
        newConsumo.cliente = cliente;
        newConsumo.fecha = data.fecha;
        newConsumo.consumo = data.total;
        return this.consumoRepo.save(newConsumo);

    }

}