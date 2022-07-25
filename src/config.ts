import { config } from "dotenv";
import {Pagination} from './models/Pagination'

config();


export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vehiculosdb";
export const PORT = process.env.PORT || 3000;