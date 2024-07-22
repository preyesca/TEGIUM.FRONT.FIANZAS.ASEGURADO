import { ObjectId } from "src/app/shared/helpers/types/objectid.type";

export interface ILoginAsegurado {
  numeroCliente: string;
  correoElectronico: string;
}

export interface ILoginAseguradoResponse {
  path: string;
  correo: string;
  titular: ILoginAseguradoTitular;
  token: string;
  refreshToken: string;
  contratos: Array<IContratos>;
}

export interface ILoginAseguradoTitular {
  nombre: string;
  numeroCliente: string;
  nombreInformacionContacto: string;
}


export interface IContratos {
  id: ObjectId,
  folio: string,
  aseguradora: string,
  estado: string,
  accion: string,
  estatus: number,
  actividad: number,
  unidad: string,
  riesgo: string,
  tipoMovimiento: string,
  proyecto: string,
  titular: string,
  pais: number,
  aseguradoraId: string
}
