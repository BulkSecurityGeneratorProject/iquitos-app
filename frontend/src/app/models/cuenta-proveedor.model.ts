import { Moment } from 'moment';

export const enum AccountTypeProvider {
    CUENTA_CORRIENTE = 'CUENTA_CORRIENTE',
    CUENTA_RECAUDADORA = 'CUENTA_RECAUDADORA'
}

export interface ICuentaProveedor {
    id?: number;
    tipoCuenta?: AccountTypeProvider;
    banco?: string;
    nombreCuenta?: string;
    numeroDeCuenta?: string;
    fecha?: Moment;
}

export class CuentaProveedor implements ICuentaProveedor {
    constructor(
        public id?: number,
        public tipoCuenta?: AccountTypeProvider,
        public banco?: string,
        public nombreCuenta?: string,
        public numeroDeCuenta?: string,
        public fecha?: Moment
    ) {}
}
