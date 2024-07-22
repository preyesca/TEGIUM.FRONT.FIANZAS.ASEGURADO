import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IContratos, ILoginAseguradoResponse } from 'src/app/modules/authentication/helpers/interfaces/login-asegurado';
import { ITitularStorage } from '../../helpers/interfaces/storage/titular.storage';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TitularStorageService {
  private readonly __TITULAR_KEY = 'keyTitular.info_';
  private readonly __CONTRACTOS_KEY = 'keyContratos.info_';

  constructor(
    private router: Router,
    private authStorageService: AuthStorageService
  ) {}

  init(loginResponse: ILoginAseguradoResponse): void {
    const titularStorage: ITitularStorage = {
      nombre: loginResponse.titular.nombre,
      numeroCliente: loginResponse.titular.numeroCliente,
    };
    sessionStorage.setItem(this.__TITULAR_KEY, JSON.stringify(titularStorage));
    sessionStorage.setItem(this.__CONTRACTOS_KEY, JSON.stringify(loginResponse.contratos));
    this.router.navigateByUrl(loginResponse.path);
  }

  getInfo(): ITitularStorage {
    const titular = sessionStorage.getItem(this.__TITULAR_KEY);
    if (!titular) {
      this.router.navigate(['/']);
      sessionStorage.clear();
      throw new Error(
        'Es necesario esta logueado en el sistema para obtener esta información.'
      );
    }
    return JSON.parse(titular!);
  }

  getInfoFolio(): IContratos[] {
    const contratos  = sessionStorage.getItem(this.__CONTRACTOS_KEY);
    if (!contratos) {
      this.router.navigate(['/']);
      sessionStorage.clear();
      throw new Error(
        'Es necesario esta logueado en el sistema para obtener esta información.'
      );
    }
    return JSON.parse(contratos!);
  }
}
