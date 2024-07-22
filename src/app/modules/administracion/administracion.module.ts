import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FicComponent } from 'src/app/shared/components/contrato-detalle/fic/fic.component';
import { NuevoContratoComponent } from 'src/app/shared/components/contrato-detalle/nuevo-contrato/nuevo-contrato.component';
import { ReprocesoComponent } from 'src/app/shared/components/contrato-detalle/reproceso/reproceso.component';
import { ValidacionComponent } from 'src/app/shared/components/contrato-detalle/validacion/validacion.component';
import { AllowedDocumentsComponent } from 'src/app/shared/components/contrato/allowed-documents/allowed-documents.component';
import { DetailCardComponent } from 'src/app/shared/components/contrato/detail-card/detail-card.component';
import { DocumentosPermitidosModalComponent } from 'src/app/shared/components/contrato/documentos-permitidos-modal/documentos-permitidos-modal.component';
import { FilesTableComponent } from 'src/app/shared/components/contrato/files-table/files-table.component';
import { HeaderComponent } from 'src/app/shared/components/contrato/header/header.component';
import { InputDocumentsComponent } from 'src/app/shared/components/contrato/input-documents/input-documents.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { AdmContratoDetalleComponent } from './pages/adm-contrato/adm-contrato-detalle/adm-contrato-detalle.component';
import { AdmContratoComponent } from './pages/adm-contrato/adm-contrato.component';
import { RecoleccionFisicosComponent } from 'src/app/shared/components/contrato-detalle/recoleccion-fisicos/recoleccion-fisicos.component';
import { CountdownModule } from 'ngx-countdown';
import { TablePaginatorIntl } from 'src/app/shared/helpers/classes/paginator.class';
import { MatPaginatorIntl } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AdministracionComponent,
    HeaderComponent,
    AdmContratoComponent,
    AdmContratoDetalleComponent,
    DetailCardComponent,
    InputDocumentsComponent,
    DocumentosPermitidosModalComponent,
    AllowedDocumentsComponent,
    FilesTableComponent,
    NuevoContratoComponent,
    ReprocesoComponent,
    FicComponent,
    ValidacionComponent,
    RecoleccionFisicosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CountdownModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass:TablePaginatorIntl
    }
  ]
})
export class AdministracionModule {}
