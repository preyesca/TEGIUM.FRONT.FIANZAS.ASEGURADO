import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from 'src/app/shared/helpers/interfaces/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthNotificacionesService {
  readonly #http = inject(HttpClient);
  private APIURL = `${environment.urlApiNotificaciones}/authentication`;

  codigo_autentificacion(data: any) {
    const body = {
      nombreUsuario: data.nombreUsuario,
      codigo: data.codigo,
      correoElectronico: data.correoElectronico,
    };
    return this.#http.post<IResponse<any>>(
      `${this.APIURL}/codigo-autentificacion`,
      body
    );
  }
}
