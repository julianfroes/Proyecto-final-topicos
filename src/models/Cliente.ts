import { IConsumo } from "./Consumo";
export interface ICliente{
    id : number;
    nombre : string;
    correo : string;
    telefono : string;
    domicilio : string;
    // fecha_nacimiento : Date;
    // consumo: IConsumo[];
}