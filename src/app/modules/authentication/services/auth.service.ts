import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/helpers/interfaces/response';

import { environment } from 'src/environments/environment';
import {
  ILoginAsegurado,
  ILoginAseguradoResponse,
} from '../helpers/interfaces/login-asegurado';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  pathAuth: string = `${environment.urlApi}/auth`;

  constructor(private http: HttpClient) {}

  loginAsegurado(
    body: ILoginAsegurado
  ): Observable<IResponse<ILoginAseguradoResponse>> {
    return this.http.post<IResponse<ILoginAseguradoResponse>>(
      `${this.pathAuth}/loginAsegurado`,
      body
    );
  }

  reenviarCodigo(body: any) {
    return this.http.post<IResponse<any>>(`${this.pathAuth}/create`, body);
  }

  confirmarCodigo(body: any) {
    return this.http.post<IResponse<any>>(
      `${this.pathAuth}/sesiones-mfa/confirm`,
      body
    );
  }

  refreshTokenAsegurado() {
    return this.http.get<IResponse<any>>(
      `${this.pathAuth}/token/refreshTokenAsegurado`
    );
  }

  getTimeExpirationAsegurado() {
    return this.http.get<IResponse<any>>(
      `${this.pathAuth}/token/getTimeExpirationAsegurado`
    );
  }
}
