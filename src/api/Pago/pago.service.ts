import { BadRequestException, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/entities/pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagoService {
    constructor( @InjectRepository(Pago) private pagoEntity : Repository< Pago >){}

    async create(idConsumo: number, tot: number){
        // const direccionidconsumo = data.id_consumo;
        const consumo = await this.pagoEntity.save({
            id:null,
            id_consumo: idConsumo,
            total: tot,
            pagado: false
        });

    }
    async pagarPago(idConsumo: number, abono: number){     
        if(idConsumo){
            const pagoPendiente = await this.pagoEntity.findOne({
                where:{ id: idConsumo },
            });
            if(pagoPendiente){
                if(pagoPendiente.pagado){
                    throw new BadRequestException('Id de pago no valida', { cause: new Error(), description: 'El id ingresado es de un pago que ya esta pagado' })
                }
                else{
                    if(abono>0){
                        if(abono >=pagoPendiente.total){
                            await this.pagoEntity.save({
                                id: pagoPendiente.id,
                                id_consumo: pagoPendiente.id_consumo,
                                total: 0,
                                pagado: true
                                
                            })
                            return "consumo saldado";
                        }
                        else{//
                            await this.pagoEntity.save({//si no es mayor pero positivo cuenta como un abono
                                id: pagoPendiente.id,
                                id_consumo: pagoPendiente.id_consumo,
                                total:pagoPendiente.total- abono,
                                pagado: false
                                
                            })
                            return "Abono de "+abono+" a sido registrado";
                        }
                    }else{
                        //pago no valido
                        throw new PreconditionFailedException('Abono no valido', { cause: new Error(), description: 'El abono ingresado es de 0 o menos o no fue ingresado' })
                    }
                }
                
                
            }else{//noencontro
                throw new BadRequestException('Id de pago no valida', { cause: new Error(), description: 'El id ingresado no coincide con ningun registro de pago el la BD' })
            }
        }
        else{
            throw new BadRequestException('Ingresa un Id', { cause: new Error(), description: 'Debes ingresar un id para buscar el pago' })
        }
    }


    
}

