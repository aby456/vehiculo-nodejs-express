import mongoose, {Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
//Interface
export interface IVehiculo{
    fechaFabricacion:       null | Date;
    marca:                  string;
    modelo:                 string;
    color:                  string;
    precio:                 number;
} 

//Schema
const vehiculoSchema = new Schema({
    fechaFabricacion : {type: Date},
    marca: {type: String},
    modelo: {type: String},
    color: {type: String},
    precio: {type: Number}
});

vehiculoSchema.plugin(mongoosePaginate);

//Model
interface VehiculoDocument extends mongoose.Document, IVehiculo{}

export const Vehiculo = model<VehiculoDocument, mongoose.PaginateModel<VehiculoDocument>>('Vehiculo', vehiculoSchema);
