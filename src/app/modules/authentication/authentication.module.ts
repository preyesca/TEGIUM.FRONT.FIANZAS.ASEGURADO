import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRecoverPasswordComponent } from './pages/auth-recover-password/auth-recover-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CodeInputModule } from 'angular-code-input';
import { AuthLoginDialogComponent } from './pages/auth-login/auth-login-dialog/auth-login-dialog.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    AuthRecoverPasswordComponent,
    AuthLoginDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    CodeInputModule,
    MatCardModule,
  ],
})
export class AuthenticationModule {}
