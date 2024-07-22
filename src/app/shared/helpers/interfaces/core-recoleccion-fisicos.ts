import { ObjectId } from "../types/objectid.type";

export interface IRecoleccionFisicos {
    folio: ObjectId;
    archivo: ObjectId;
    claveGuia?:string;
}