import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFnzValidacionDigital } from '../../helpers/interfaces/core-firma-cliente';
import { IRecoleccionFisicos } from '../../helpers/interfaces/core-recoleccion-fisicos';
import { IResponse } from '../../helpers/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class PortalAseguradoService {
  readonly apiURL = `${environment.urlApi}/core/portal-asegurado`;

  constructor(private http: HttpClient, private router: Router) {}

  getConfiguracionDocumental(
    pais: number,
    aseguradora: string,
    proyecto: string,
    titular: string
  ) {
    return this.http.get<any>(
      `${this.apiURL}/select-by-titular?pais=${pais}&aseguradora=${aseguradora}&proyecto=${proyecto}&titular=${titular}`
    );
  }

  getFic(pais: number, aseguradora: string, proyecto: string, titular: string) {
    return this.http.get<any>(
      `${this.apiURL}/find-documentos-titular?pais=${pais}&aseguradora=${aseguradora}&proyecto=${proyecto}&titular=${titular}`
    );
  }

  getGeneracionFormatos(folio: string) {
    return this.http.get<any>(
      `${this.apiURL}/find-generacion-formatos?folio=${folio}`
    );
  }

  getValidacionDocumental(folio: string) {
    return this.http.get<any>(
      `${this.apiURL}/find-validacion-documental?folio=${folio}`
    );
  }

  getComentarios(folio: string, actividad: string) {
    return this.http.get<any>(
      `${this.apiURL}/find-comentario-by-folio-actividad?folio=${folio}&actividad=${actividad}`
    );
  }

  getFileBase64ByFileName(
    fileName: string,
    titular: string
  ): Observable<IResponse<any>> {
    return this.http.get<IResponse<any>>(
      `${this.apiURL}/download-portal?fileName=${fileName}&titular=${titular}`
    );
  }

  getByArchivo(id: string) {
    return this.http.get<IResponse<any[]>>(
      `${environment.urlApi}/expedientedigital/archivos/${id}`
    );
  }

  checkDocumentacion(
    pais: number,
    aseguradora: string,
    proyecto: string,
    titular: string
  ) {
    return this.http.get<IResponse<any[]>>(
      `${this.apiURL}/find-documentos-titular?pais=${pais}&aseguradora=${aseguradora}&proyecto=${proyecto}&titular=${titular}`
    );
  }

  getByIdAndGetCatalogosToEditRecoleccion(
    _id: string
  ): Observable<IResponse<IFnzValidacionDigital>> {
    return this.http.get<IResponse<IFnzValidacionDigital>>(
      `${this.apiURL}/find-one-to-edit-recoleccion-fisicos/${_id}`
    );
  }

  saveRecoleccionFisicos(data: IRecoleccionFisicos) {
    return this.http.post<IResponse<any>>(
      `${this.apiURL}/save-recoleccion-fisicos`,
      data
    );
  }

  getByIdAndGetCatalogosToEditFirmaCliente(
    _id: string
  ): Observable<IResponse<IFnzValidacionDigital>> {
    return this.http.get<IResponse<IFnzValidacionDigital>>(
      `${this.apiURL}/find-one-to-edit-firma-cliente/${_id}`
    );
  }

  updateFirmaCliente(
    _id: string,
    validacion: IFnzValidacionDigital
  ): Observable<IResponse<IFnzValidacionDigital>> {
    return this.http.put<IResponse<IFnzValidacionDigital>>(
      `${this.apiURL}/firma-cliente/${_id}`,
      validacion
    );
  }

  createFirmaCliente(
    validacion: IFnzValidacionDigital
  ): Observable<IResponse<IFnzValidacionDigital>> {
    return this.http.post<IResponse<IFnzValidacionDigital>>(
      `${this.apiURL}/save-firma-cliente`,
      validacion
    );
  }
}
