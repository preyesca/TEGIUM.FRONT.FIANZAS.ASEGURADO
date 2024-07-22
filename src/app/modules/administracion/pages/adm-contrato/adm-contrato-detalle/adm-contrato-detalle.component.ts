import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IContratos } from 'src/app/modules/authentication/helpers/interfaces/login-asegurado';
import { ITitularStorage } from 'src/app/shared/helpers/interfaces/storage/titular.storage';
import { NotifierService } from 'src/app/shared/services/notification/notifier.service';
import { PortalAseguradoService } from 'src/app/shared/services/portal-asegurado/portal-asegurado.service';
import { TitularStorageService } from 'src/app/shared/services/storage/titular-storage.service';

@Component({
  selector: 'app-contrato-detalle',
  templateUrl: './adm-contrato-detalle.component.html',
  styleUrls: ['./adm-contrato-detalle.component.scss'],
})
export class AdmContratoDetalleComponent {
  public activeRoute = inject(ActivatedRoute)
  public status:number = 1
  listContratos: any = [];
  contrato: IContratos = <IContratos>{};
  titular: ITitularStorage = <ITitularStorage>{};
  documentos:[] = []
  configuracion:[] = []
  motivos: any[] = [];

  constructor(private titularStorageService: TitularStorageService, 
    private portalService: PortalAseguradoService,
    private portalAseguradoService: PortalAseguradoService, 
    private readonly notifierService: NotifierService
    ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.listContratos = this.titularStorageService.getInfoFolio();
      this.titular = this.titularStorageService.getInfo();
      this.contrato =  this.listContratos.find((element:any ) => element.folio === params.get('id'))
      this.documentosRequeridos();
    })
  }

  async documentosRequeridos(){
    const responses = await lastValueFrom(
      this.portalService.getConfiguracionDocumental(
        this.contrato.pais,
        this.contrato.aseguradoraId,
        this.contrato.proyecto,
        this.contrato.titular
      )
    );
    this.documentos = responses.data.documentos
    this.configuracion = responses.data.configuracion
    this.motivos = responses.data.motivos;
  }
}
