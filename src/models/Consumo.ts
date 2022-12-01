import { IPago } from "./Pago"

export interface IConsumo{
    id : number
    fecha : Date
    consumo : number
    id_cliente : number
    //TODO relacion debe ir aqui? pago : IPago[] 
}
