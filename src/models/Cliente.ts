import { IConsumo, IPago } from "./Consumo";
//TODO falta relacion de modelo de otras tablas
export interface Cliente{
    id : number;
    nombre : string;
    correo : string;
    telefono : string;
    domicilio : string;
    fecha_nacimiento : Date;
    consumo: IConsumo[];
}