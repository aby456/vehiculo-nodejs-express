import {Application} from 'express';
import { createVehiculo, deleteVehiculo, listVehiculos, retrieveVehiculo, updateVehiculo } from './controllers/vehiculo.controller';

export const router = (app: Application) => {
    app.post("/vehiculos", createVehiculo);    
    app.get("/vehiculos/:id", retrieveVehiculo);
    app.put("/vehiculos/:id", updateVehiculo);
    app.delete("/vehiculos/:id", deleteVehiculo);    
    app.get("/vehiculos", listVehiculos);
}