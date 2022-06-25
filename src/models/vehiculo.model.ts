import { Schema, model } from 'mongoose';

//Interface
export interface IVehiculo {
    fechaFabricacion:       null | Date;
    marca:                  string;
    modelo:                 string;
    color:                  string;
    precio:                 number;
} 

//Schema
const vehiculoSchema = new Schema<IVehiculo>({
    fechaFabricacion : {type: Date},
    marca: {type: String},
    modelo: {type: String},
    color: {type: String},
    precio: {type: Number}
});

//Model
const Vehiculo = model<IVehiculo>('Vehiculo', vehiculoSchema);

export {Vehiculo}