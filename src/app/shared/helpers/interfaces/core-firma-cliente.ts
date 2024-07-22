import { ObjectId } from "../types/objectid.type";

export interface IFnzValidacionDigital {
    folio?: ObjectId;
    archivoFic?: ObjectId;
    archivoAnexo?: ObjectId;
    archivos?: any[]
  }
  