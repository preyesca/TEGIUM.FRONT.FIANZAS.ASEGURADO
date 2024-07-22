import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { IResponse } from 'src/app/shared/helpers/interfaces/response';
import { NotifierService } from 'src/app/shared/services/notification/notifier.service';
import { TitularStorageService } from 'src/app/shared/services/storage/titular-storage.service';
import {
  ILoginAsegurado,
  ILoginAseguradoResponse,
} from '../../helpers/interfaces/login-asegurado';
import { AuthService } from '../../services/auth.service';
import { AuthNotificacionesService } from '../../services/notificaciones.service';
import { AuthLoginDialogComponent } from './auth-login-dialog/auth-login-dialog.component';
import { AppConsts } from 'src/app/shared/AppConsts';

@Component({
  selector: 'app-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup = <FormGroup>{};
  login: ILoginAsegurado = <ILoginAsegurado>{};

  logging: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private titularStorageService: TitularStorageService,
    private readonly notifierService: NotifierService,
    private readonly dialog: MatDialog,
    private readonly authNotificacionesService: AuthNotificacionesService
  ) {}

  ngOnInit(): void {
    this.frmLogin = this.formBuilder.group({
      numeroCliente: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      correoElectronico: [
        '',
        [
          Validators.required,
          Validators.pattern(AppConsts.PATTERN.EMAIL_ADDRESS),
        ],
      ],
    });
  }

  onKeyDownNumeroCliente(e: KeyboardEvent): void {
    const keys = ['tab', 'backspace'];
    if (
      !/^\d+$/.test(e.key) &&
      !keys.includes(e.key.toLocaleLowerCase()) &&
      !(e.ctrlKey && e.key.toLocaleLowerCase() === 'v')
    )
      e.preventDefault();
  }

  onPasteNumeroCliente(e: ClipboardEvent) {
    if (!/^\d+$/.test(e.clipboardData?.getData('text') ?? ''))
      e.preventDefault();
  }

  authentication(): void {
    if (this.frmLogin.invalid) {
      this.frmLogin.markAllAsTouched();
      return;
    }

    if (this.logging) return;
    this.logging = true;
    this.frmLogin.disable();

    const login = <ILoginAsegurado>this.frmLogin.value;

    this.authService
      .loginAsegurado(login)
      .pipe(
        finalize(() => {
          this.logging = false;
          this.frmLogin.enable();
        })
      )
      .subscribe({
        next: (response: IResponse<ILoginAseguradoResponse>) => {
          if (response.success) {
            this.dialog.open(AuthLoginDialogComponent, {
              disableClose: true,
              data: {
                correo: response.data?.correo,
                data: response.data,
              },
            });
          } else this.notifierService.warning(response.message);
        },
        error: (err: any) => this.notifierService.error(err?.error?.message),
      });
  }
}
