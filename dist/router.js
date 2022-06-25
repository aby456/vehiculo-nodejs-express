"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const vehiculo_controller_1 = require("./controllers/vehiculo.controller");
const router = (app) => {
    app.post("/vehiculos", vehiculo_controller_1.createVehiculo);
    app.get("/vehiculos/:id", vehiculo_controller_1.retrieveVehiculo);
    app.put("/vehiculos/:id", vehiculo_controller_1.updateVehiculo);
    app.delete("/vehiculos/:id", vehiculo_controller_1.deleteVehiculo);
    app.get("/vehiculos", vehiculo_controller_1.listVehiculos);
};
exports.router = router;
