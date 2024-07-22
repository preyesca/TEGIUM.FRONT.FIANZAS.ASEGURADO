import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { AdmContratoDetalleComponent } from './pages/adm-contrato/adm-contrato-detalle/adm-contrato-detalle.component';
import { AdmContratoComponent } from './pages/adm-contrato/adm-contrato.component';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent,
    children: [
      { path: '', redirectTo: 'mis-contratos', pathMatch: 'full' },
      { path: 'mis-contratos', component: AdmContratoComponent },
      {
        path: 'mis-contratos/detalles/:id',
        component: AdmContratoDetalleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
