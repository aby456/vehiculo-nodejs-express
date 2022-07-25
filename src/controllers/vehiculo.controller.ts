import { Request, Response } from 'express';
import  { IVehiculo, Vehiculo} from '../models/vehiculo.model';
import { IResponse } from '../models/response.model';
import {paginationParseParams} from '../configPage';


export const createVehiculo = async (req: Request, res: Response)=> {           
    const { fechaFabricacion, marca, modelo, color, precio } : IVehiculo = req.body;
    const response = await new VehiculoController().create({ fechaFabricacion, marca, modelo, color, precio });         
    return res.status(response.status).json(response);   
}

export const retrieveVehiculo = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new VehiculoController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updateVehiculo = async (req: Request, res: Response)=> {           
    const { fechaFabricacion, marca, modelo, color, precio } : IVehiculo = req.body;
    const docId : String = req.params.id; 
    const response = await new VehiculoController().update(docId, { fechaFabricacion, marca, modelo, color, precio });         
    return res.status(response.status).json(response);   
}

export const deleteVehiculo = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new VehiculoController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listVehiculos = async (req: Request, res: Response) => {

    const datosPagination:any= req.query;
    const {paginationParse} = paginationParseParams(datosPagination);

    const response = await new VehiculoController().list(paginationParse.limit, paginationParse.page);         
    return res.status(200).json(response);    
}


class VehiculoController {

    public async create(carros : IVehiculo) : Promise<IResponse> {
        const vehiculo = new Vehiculo(carros);
        return vehiculo.save().then(data => {
            return {
                message: "CREATED: Vehiculo added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Vehiculo",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Vehiculo.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Vehiculo not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Vehiculo retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.modelo ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, carros : IVehiculo) : Promise<IResponse>{
        return Vehiculo.updateOne({_id: docId} , { $set: { 
            fechaFabricacion: carros.fechaFabricacion, 
            marca: carros.marca, 
            modelo: carros.modelo, 
            color: carros.color, 
            precio: carros.precio
          } }).then(data => {            
            return {
                message: "OK: Vehiculo updated",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Vehiculo not updated",
                status: 500,
                content : err
            }
        });
    }
    



    public async delete(docId: String) : Promise<IResponse> {
        return Vehiculo.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Vehiculo not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Vehiculo deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.modelo,
                status: 500,
                content : err
            }
        });
    }

    public async list(limit:number, page:number) : Promise<IResponse> {
        console.log("Comprobando si me llega en la funcion list");
        console.log(limit, page);
        return Vehiculo.paginate({},{limit, page}).then(data => {
                return {
                    message: "OK: All Vehiculos retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Vehiculos", status: 500, content : err }
        });       
    }

}