import { IConsumo, IPago } from "./Consumo";
export interface Cliente{
    id : number;
    nombre : string;
    correo : string;
    telefono : string;
    domicilio : string;
    fecha_nacimiento : Date;
    consumo: IConsumo[];
}