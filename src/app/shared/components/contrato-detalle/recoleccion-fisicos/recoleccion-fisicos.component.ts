import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { FnzEActividad } from 'src/app/modules/authentication/helpers/enums/fnz-actividad.enum';
import { IContratos } from 'src/app/modules/authentication/helpers/interfaces/login-asegurado';
import { AppConsts } from 'src/app/shared/AppConsts';
import { EstatusBitacoraConsts } from 'src/app/shared/helpers/consts/estatus-bitacora.consts';
import { DocumentData } from 'src/app/shared/helpers/data/document.data';
import { EFnzNotificacion } from 'src/app/shared/helpers/enums/notificacion.enum';
import { IRecoleccionFisicos } from 'src/app/shared/helpers/interfaces/core-recoleccion-fisicos';
import { IArchivo } from 'src/app/shared/helpers/interfaces/core-validacion-documental';
import { IWorlFlow } from 'src/app/shared/helpers/interfaces/core-workflow';
import { IResponse } from 'src/app/shared/helpers/interfaces/response';
import { responseFile } from 'src/app/shared/helpers/interfaces/response-file';
import { UtilsService } from 'src/app/shared/helpers/services/utils.service';
import { NotifierService } from 'src/app/shared/services/notification/notifier.service';
import { SwalService } from 'src/app/shared/services/notification/swal.service';
import { PortalAseguradoService } from 'src/app/shared/services/portal-asegurado/portal-asegurado.service';
import { WorkflowService } from 'src/app/shared/services/portal-asegurado/workflow.service';
import { TitularStorageService } from 'src/app/shared/services/storage/titular-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recoleccion-fisicos',
  templateUrl: './recoleccion-fisicos.component.html',
  styleUrls: ['./recoleccion-fisicos.component.scss'],
})
export class RecoleccionFisicosComponent implements OnChanges {
  @Input() configuracion: any;
  @Input() contrato: IContratos = <IContratos>{};

  public fb = inject(FormBuilder);

  public formNewContracts!: FormGroup;
  public listaDocumentsNewContract: File[] = [];
  lstFiles: IArchivo[] = [];
  extencionesPermitidas: string = AppConsts.EXTENSION_PERMITIDOS.EXTENSION;
  responseFile = {} as responseFile;
  currentId: string = '';
  generacionFormato!: IRecoleccionFisicos;

  constructor(
    private readonly notifierService: NotifierService,
    private readonly swalService: SwalService,
    private http: HttpClient,
    private router: Router,
    private portalService: PortalAseguradoService,
    private readonly utilsService: UtilsService,
    private readonly workflowService: WorkflowService,
    private readonly titularStorage : TitularStorageService

  ) {}

  ngOnChanges(): void {
    this.portalService
      .getByIdAndGetCatalogosToEditRecoleccion(this.contrato.folio)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            if (response.data != null) {
              this.currentId = response.data._id;
              this.generacionFormato = response.data;
            }
          }
        },
      });
  }

  ngOnInit(): void {
    this.formNewContracts = this.fb.group({
      document: [''],
      claveGuia: [''],
    });
  }

  selectFile(input: any): void {
    input.click();
  }

  handleFileInputChange(files: FileList | null, documento: string): void {
    if (files?.length == 0) {
      return;
    }

    for (let index = 0; index < files!.length; index++) {
      let file = files![index];
      const strExtension = file.name
        .split('.')
        [file.name.split('.').length - 1].toUpperCase();
      const lstExtensiones = this.extencionesPermitidas.split(',');

      if (lstExtensiones.includes('.' + strExtension)) {
        let archivo: IArchivo = {
          documento: documento,
          titular: this.contrato.titular,
          aseguradora: this.contrato.aseguradoraId,
          file: file,
          nombreOriginal: file.name,
          key: Guid.create().toString(),
        };
        this.lstFiles.push(archivo);
      } else {
        this.swalService.info({
          html:
            'Ups, las extensiones permitidas son <br>' +
            this.extencionesPermitidas.split('.').join(' '),
        });
      }
    }
  }

  removeDocument(documento: any) {
    this.lstFiles = this.lstFiles.filter(
      (element) => element.key != documento.key
    );
  }

  clik_remove(documento: any) {
    this.removeDocument(documento);
  }

  clik_mostrar(documento: any) {
    const file = this.lstFiles.find(
      (element: any) =>
        element.documento === documento.documento &&
        element.key === documento.key
    )?.file;

    const fileSelected = file as File;
    const reader = new FileReader();
    const self = this;

    reader.onload = function (readerEvt) {
      let binaryString = readerEvt.target?.result!;
      let base64 = btoa(binaryString.toString());
      self.utilsService.b64toBlob;
      let blobFile = self.utilsService.b64toBlob(
        base64,
        fileSelected.type,
        512
      );
      let urlBlobFile = window.URL.createObjectURL(blobFile);

      window.open(
        urlBlobFile,
        '_blank',
        'location=yes,height=650,width=600,scrollbars=yes,status=yes'
      );
    };
    reader.readAsBinaryString(fileSelected);
  }

  save_data() {
    const recoleccionFisicos: any = {
      _id: null,
      folio: this.contrato.folio,
      archivo: this.responseFile._id,
      claveGuia: this.formNewContracts.get('claveGuia')?.value,
    };

    if (this.currentId !== '') {
      recoleccionFisicos._id = this.currentId;
      this.portalService
        .saveRecoleccionFisicos(recoleccionFisicos)
        .subscribe((response) => {});
    } else {
      this.portalService
        .saveRecoleccionFisicos(recoleccionFisicos)
        .subscribe((response: any) => {
          if (response.success) {
            this.currentId = response.data._id;
          }
        });
    }
  }

  async click_enviar_documentos() {
    if (this.lstFiles.length === 0) {
      this.swalService.warning({
        html: 'Documentación requerida para avanzar la actividad ',
      });
      return;
    }
    this.uploadFiles();
  }

  async avanzar() {
    const workflow: IWorlFlow = {
      folio: this.contrato.folio,
      actividadInicial: FnzEActividad.RECOLECCION_DE_FISICOS,
      actividadFinal: FnzEActividad.VALIDACION_DE_ORIGINALES,
      actividad: EstatusBitacoraConsts.FISICOS_ENVIADOS,
      notificacion: EFnzNotificacion.FISICOS_ENVIADOS,
    };

    await this.workflowService.avanzar(workflow).subscribe((response) => {
      this.swalService
        .success({
          html: 'Información almacenada correctamente, se avanzó la actividad a <b>Validación de originales </b>',
        })
        .then(() => {
          const infoFolios =this.titularStorage.getInfoFolio();
          infoFolios.forEach((infoFolio) => {
            if(infoFolio.folio == workflow.folio){
              infoFolio.actividad = workflow.actividadFinal
            }
          })
          sessionStorage.setItem("keyContratos.info_", JSON.stringify(infoFolios));
          this.router.navigate(['/administration/mis-contratos']);
        });
    });
  }

  uploadFiles() {
    this.lstFiles.forEach((item) => {
      const formData: FormData = this.setFormData(item);
      const request = new HttpRequest(
        'POST',
        `${environment.urlApi}/core/portal-asegurado`,
        formData
      );
      this.http.request(request).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event.type === HttpEventType.Response) {
            const response = event.body as IResponse<responseFile>; // Conversión de tipo
            if (response.success) {
              this.responseFile = response.data;
              this.save_data();
              this.avanzar();
              this.lstFiles = [];
            } else {
              console.error(response.message);
            }
          }
        },
        (error) => {
          this.notifierService.warning(
            'Información',
            'Sucedió un error al cargar los archivos'
          );
        }
      );
    });
  }

  setFormData(file: IArchivo): FormData {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('aseguradora', file.aseguradora);
    formData.append('titular', file.titular);
    formData.append('documento', file.documento);
    formData.append('nombreOriginal', file.nombreOriginal);
    return formData;
  }

  getmimeType(name: string) {
    return name.split('.')[1];
  }

  getListDocumentsAllowed(document: string): string[] {
    const data = DocumentData.hashTable[document];
    return data ? data.listDocumentsAllowed : [];
  }
}
