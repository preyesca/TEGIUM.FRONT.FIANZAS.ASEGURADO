import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { NotifierService } from 'src/app/shared/services/notification/notifier.service';
import { IResponse } from 'src/app/shared/helpers/interfaces/response';
import { ISesionMfa } from '../../../helpers/interfaces/sesion-mfa.interface';
import { TitularStorageService } from 'src/app/shared/services/storage/titular-storage.service';
import { AuthNotificacionesService } from '../../../services/notificaciones.service';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-auth-login-dialog',
  templateUrl: './auth-login-dialog.component.html',
  styleUrls: ['./auth-login-dialog.component.scss']
})
export class AuthLoginDialogComponent {
  @ViewChild('btnRef') buttonRef!: MatButton;
  code: string = '';
  constructor(
    private _focusMonitor: FocusMonitor,
    public dialogRef: MatDialogRef<AuthLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      correo: string;
      usuarioId: string;
      data: any;
    },
    private titularStorageService: TitularStorageService,
    private authService: AuthService,
    private notifierService: NotifierService,
    private readonly authNotificacionesService: AuthNotificacionesService,
  ) { }

  reenviarCodigo() {
    this.authService.loginAsegurado({
      numeroCliente: this.data.data.titular.numeroCliente,
      correoElectronico: this.data.correo,
    }).subscribe({
      next: (response: IResponse<ISesionMfa>) => {
        if (response.success) {
          this.notifierService.info('Se reenvió un nuevo código de seguridad');
        }
        else this.notifierService.warning(response.message);
      },
      error: (error) => this.notifierService.warning(error.error.message),
    });
  }

  confirmarCodigo() {
    this.authService.confirmarCodigo({
      correo: this.data.correo,
      codigo: Number(this.code)
    }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.titularStorageService.init(this.data.data);
          this.dialogRef.close();
          sessionStorage.setItem('keyToken', response.data.token.token);
        }
        else this.notifierService.warning(response.message);
      },
      error: (error) => this.notifierService.warning(error.error.message),
    });
  }

  onCodeChanged(code: string) {
    this.code = code;
    if (this.code.length === 3)
      setTimeout(() => {
        this.buttonRef.focus();
      }, 200);
  }
}
