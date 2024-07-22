import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { IResponse } from 'src/app/_interfaces/response';
// import { ILogin, IResponseToken } from 'src/app/_interfaces/security';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWorlFlow } from '../../helpers/interfaces/core-workflow';
import { IResponse } from '../../helpers/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private readonly apiUrl = `${environment.urlApi}/workflow`;

  constructor(private http: HttpClient, private router: Router) {}

  actualizarActividad(_id: string): Observable<IResponse<any>> {
    return this.http.put<IResponse<any>>(
      `${this.apiUrl}/actualizar-actividad/${_id}`,
      {}
    );
  }

  avanzar(workflow: IWorlFlow): Observable<IResponse<any>> {
    return this.http.post<IResponse<any>>(
      `${environment.urlApi}/core/portal-asegurado/avanzar-portal`,
      workflow
    );
  }
}
