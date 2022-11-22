export interface IConsumo{
    id : number
    fecha : Date
    pago : IPago[]
}

export interface IPago{
    total : number
    pagado : boolean
}