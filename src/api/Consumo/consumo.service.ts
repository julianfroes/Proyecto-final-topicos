//import { PagoService } from './../pago/pago.service';
import { IConsumo } from './../../models/Consumo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumo } from 'src/entities/consumo.entity';
import { PagoService } from '../Pago/pago.service';

@Injectable()
export class ConsumoService {
    constructor(
        @InjectRepository(Consumo) private consumoRepo: Repository<Consumo>,
        private pagoService: PagoService
    ) {
        
    }
    async create(consumo: IConsumo) {
        //Se crea consumo y se calculan precios por rangos
        const date = new Date();
        let total = 0;
        const kw = consumo.consumo;
        if (kw > 0 && kw >= 100) {
            total = kw * 150;
        } else if (kw > 100 && kw <= 170) {
            total = kw * 300;
        } else {
            total = kw * 190;
        }

        let edad = this.calcularEdad(consumo.fecha);
        if (edad > 50) {
            let nuevoTotal = total - (total * 0.1);
            total = nuevoTotal;
        }

        const newConsumo = await this.consumoRepo.save({
            fecha: date,
            consumo: kw,
            id_cliente: consumo.id_cliente
            
        }).then((res) => {this.pagoService.create(res.consumo, total)})
    }

    //Obtener registro de consumo y su respectivo pago
    getAll(){
        return this.consumoRepo.find({
            relations:['id_cliente', 'pago.id_consumo']
        })
    }

    //TODO Falta obtener quien consumio mas y menos kw


    calcularEdad = (fecha) => {
        const date = new Date();
        let birthday = new Date(fecha);
        let edad = date.getFullYear() - birthday.getFullYear();
        let mes = date.getMonth() - birthday.getMonth();

        if (mes < 0 || (mes === 0 && date.getDate() < birthday.getDate())) {
            edad--;
        }
        return edad;
    }

}