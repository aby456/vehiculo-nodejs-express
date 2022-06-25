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
exports.listPlayers = exports.deletePlayer = exports.updatePlayer = exports.retrievePlayer = exports.createPlayer = void 0;
const player_model_1 = require("../models/player.model");
const createPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dateOfBirth, placeOfBirth, name, heigth, tshirt } = req.body;
    const response = yield new PlayerController().create({ dateOfBirth, placeOfBirth, name, heigth, tshirt });
    return res.status(response.status).json(response);
});
exports.createPlayer = createPlayer;
const retrievePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PlayerController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrievePlayer = retrievePlayer;
const updatePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dateOfBirth, placeOfBirth, name, heigth, tshirt } = req.body;
    const docId = req.params.id;
    const response = yield new PlayerController().update(docId, { dateOfBirth, placeOfBirth, name, heigth, tshirt });
    return res.status(response.status).json(response);
});
exports.updatePlayer = updatePlayer;
const deletePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PlayerController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deletePlayer = deletePlayer;
const listPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new PlayerController().list();
    return res.status(200).json(response);
});
exports.listPlayers = listPlayers;
class PlayerController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = new player_model_1.Player(payload);
            return player.save().then(data => {
                return {
                    message: "CREATED: Player added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Player",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Player not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Player retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.updateOne({ _id: docId }, { $set: {
                    dateOfBirth: payload.dateOfBirth,
                    placeOfBirth: payload.placeOfBirth,
                    name: payload.name,
                    heigth: payload.heigth,
                    tshirt: payload.tshirt
                } }).then(data => {
                return {
                    message: "OK: Player updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Player not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Player not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Player deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.find({}).then(data => {
                return {
                    message: "OK: All players retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Players", status: 500, content: err };
            });
        });
    }
}
