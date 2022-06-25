"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const mongoose_1 = require("mongoose");
//Schema
const vehiculoSchema = new mongoose_1.Schema({
    fechaFabricacion: { type: Date },
    marca: { type: String },
    modelo: { type: String },
    color: { type: String },
    precio: { type: Number }
});
//Model
const Vehiculo = (0, mongoose_1.model)('Vehiculo', vehiculoSchema);
exports.Vehiculo = Vehiculo;
