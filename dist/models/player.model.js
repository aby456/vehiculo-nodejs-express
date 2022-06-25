"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const mongoose_1 = require("mongoose");
//Schema
const playerSchema = new mongoose_1.Schema({
    dateOfBirth: { type: Date },
    placeOfBirth: { type: String },
    name: { type: String },
    heigth: { type: Number },
    tshirt: { type: Number }
});
//Model
const Player = (0, mongoose_1.model)('Player', playerSchema);
exports.Player = Player;
