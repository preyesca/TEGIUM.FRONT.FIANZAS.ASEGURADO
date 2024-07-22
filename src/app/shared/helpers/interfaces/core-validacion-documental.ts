
import { ObjectId } from "src/app/shared/helpers/types/objectid.type";

export interface IArchivoValidacion {
  id: ObjectId;
  documento: string;
  url: string;
  motivos: ICatalogo[];
  vigencia?: boolean;
  fechaVigencia: string;
  correcto: boolean;
  idMotivo?: number;
  categoria: number;
}

export interface IArchivoComplementarios {
  id: ObjectId;
  documento: string;
  url: string;
}


//ajustes 
export interface IValidacionDigital {
  folio?: ObjectId;
  archivos?: any[]
}

export interface IValidacionDigitalArchivos {
  documento: number;
  correcto: boolean;
  motivo: number;
}

export interface IValidacionDigitalEdit {
  documentos: Array<IValidacionDigital>;
  catalogos: IValidacionDigitalCatalogs;
}

export interface IValidacionDigitalCatalogs {
  motivos: Array<ICatalogo>;
}

export interface IFileBase64 {
  fileBase64: string;
  type: string
}

export interface ICatalogo {
  _id: ObjectId;
  clave: number;
  descripcion: string;
  activo: true;
}

export interface IArchivo {
  key?: string,
  titular: string,
  documento: string,
  nombreOriginal: string,
  aseguradora: string,
  indexDocumento?: number,
  nombre?:string,
  file: File
}