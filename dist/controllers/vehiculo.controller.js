"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listVehiculos = exports.deleteVehiculo = exports.updateVehiculo = exports.retrieveVehiculo = exports.createVehiculo = void 0;
const vehiculo_model_1 = require("../models/vehiculo.model");
const createVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaFabricacion, marca, modelo, color, precio } = req.body;
    const response = yield new VehiculoController().create({ fechaFabricacion, marca, modelo, color, precio });
    return res.status(response.status).json(response);
});
exports.createVehiculo = createVehiculo;
const retrieveVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new VehiculoController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveVehiculo = retrieveVehiculo;
const updateVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaFabricacion, marca, modelo, color, precio } = req.body;
    const docId = req.params.id;
    const response = yield new VehiculoController().update(docId, { fechaFabricacion, marca, modelo, color, precio });
    return res.status(response.status).json(response);
});
exports.updateVehiculo = updateVehiculo;
const deleteVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new VehiculoController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteVehiculo = deleteVehiculo;
const listVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new VehiculoController().list();
    return res.status(200).json(response);
});
exports.listVehiculos = listVehiculos;
class VehiculoController {
    create(carros) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculo = new vehiculo_model_1.Vehiculo(carros);
            return vehiculo.save().then(data => {
                return {
                    message: "CREATED: Vehiculo added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Vehiculo",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return vehiculo_model_1.Vehiculo.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Vehiculo not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Vehiculo retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.modelo,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, carros) {
        return __awaiter(this, void 0, void 0, function* () {
            return vehiculo_model_1.Vehiculo.updateOne({ _id: docId }, { $set: {
                    fechaFabricacion: carros.fechaFabricacion,
                    marca: carros.marca,
                    modelo: carros.modelo,
                    color: carros.color,
                    precio: carros.precio
                } }).then(data => {
                return {
                    message: "OK: Vehiculo updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Vehiculo not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return vehiculo_model_1.Vehiculo.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Vehiculo not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Vehiculo deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.modelo,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return vehiculo_model_1.Vehiculo.find({}).then(data => {
                return {
                    message: "OK: All Vehiculos retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Vehiculos", status: 500, content: err };
            });
        });
    }
}
