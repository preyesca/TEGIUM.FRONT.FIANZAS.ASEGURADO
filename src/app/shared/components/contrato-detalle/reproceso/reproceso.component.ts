import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { finalize, lastValueFrom } from 'rxjs';
import { FnzEActividad } from 'src/app/modules/authentication/helpers/enums/fnz-actividad.enum';
import { IContratos } from 'src/app/modules/authentication/helpers/interfaces/login-asegurado';
import { AppConsts } from 'src/app/shared/AppConsts';
import { EstatusBitacoraConsts } from 'src/app/shared/helpers/consts/estatus-bitacora.consts';
import { DocumentData } from 'src/app/shared/helpers/data/document.data';
import { EActividad } from 'src/app/shared/helpers/enums/actividad.enum';
import { EFnzNotificacion } from 'src/app/shared/helpers/enums/notificacion.enum';
import { IArchivo } from 'src/app/shared/helpers/interfaces/core-validacion-documental';
import { IWorlFlow } from 'src/app/shared/helpers/interfaces/core-workflow';
import { UtilsService } from 'src/app/shared/helpers/services/utils.service';
import { NotifierService } from 'src/app/shared/services/notification/notifier.service';
import { SwalService } from 'src/app/shared/services/notification/swal.service';
import { PortalAseguradoService } from 'src/app/shared/services/portal-asegurado/portal-asegurado.service';
import { WorkflowService } from 'src/app/shared/services/portal-asegurado/workflow.service';
import { TitularStorageService } from 'src/app/shared/services/storage/titular-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reproceso',
  templateUrl: './reproceso.component.html',
  styleUrls: ['./reproceso.component.scss'],
})
export class ReprocesoComponent implements OnChanges {
  @Input() configuracion: any;
  @Input() contrato: IContratos = <IContratos>{};
  @Input() motivos: any[] = [];

  public fb = inject(FormBuilder);

  public formNewContracts!: FormGroup;
  public listaDocumentsNewContract: File[] = [];
  lstFiles: IArchivo[] = [];
  extencionesPermitidas: string = AppConsts.EXTENSION_PERMITIDOS.EXTENSION;
  lstDocumentosIncorrectos: any[] = [];
  lstDocumentos: any[] = [];
  configuracionDocumentos: any;
  comentario: any[] = [];

  constructor(
    private readonly notifierService: NotifierService,
    private readonly swalService: SwalService,
    private http: HttpClient,
    private router: Router,
    private portalService: PortalAseguradoService,
    private readonly utilsService: UtilsService,
    private readonly workflowService: WorkflowService,
    private readonly titularStorage : TitularStorageService

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.portalService.getValidacionDocumental(this.contrato.folio).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.documentosRequeridos();
          this.comentarios();
          this.lstDocumentosIncorrectos = []
          if (this.configuracion?.documento) {
            this.configuracion?.documento.map((element: any) => {
              const documento = response.data.archivos.filter(
                (doc: any) =>
                  doc.documento == element.documento && doc.correcto == false
              );
              if (documento.length > 0) {
                let { motivo, correcto } = documento[0];
                this.lstDocumentosIncorrectos.push({
                  ...element,
                  motivo,
                  correcto,
                });
              }
            });
            this.configuracion?.documento.map((element: any) => {
              const documento = this.lstDocumentosIncorrectos.find(
                (item: any) => item.documento == element.documento
              );
              const existe = this.lstDocumentos.find(
                (item: any) => item.documento == element.documento
              );
              if (documento != undefined && existe == undefined) {
                this.lstDocumentos.push(element);
              }
            });
          }
        }
      },
      error: (err) => this.notifierService.error(err?.error?.message),
    });
  }

  getDescription(item: any) {
    return this.motivos.find((element: any) => element.clave === item.motivo)
      ?.descripcion;
  }

  ngOnInit(): void {
    this.formNewContracts = this.fb.group({
      document: [''],
    });
  }

  async documentosRequeridos() {
    const responses = await lastValueFrom(
      this.portalService.getConfiguracionDocumental(
        this.contrato.pais,
        this.contrato.aseguradoraId,
        this.contrato.proyecto,
        this.contrato.titular
      )
    );
    this.configuracionDocumentos = responses.data.configuracion.documento;
  }

  async comentarios() {

    this.portalService.getComentarios(this.contrato.folio,
      EActividad.VALIDACION_DIGITAL.toString()).subscribe({
        next: (response: any) => {
          if (response.success) {
            const data = response.data || [];
            if (data.length > 0) {
              this.comentario = data[0].actividades.comentarios;
            }
          }
        },
        error: (err) => this.notifierService.error(err?.error?.message),
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

  async click_enviar_documentos() {
    let filesCargados = 0;
    const docObligatorio = this.lstDocumentosIncorrectos.filter(
      (element: any) => element.correcto == false && element.motivo > 0
    );
    docObligatorio.map((element: any) => {
      let existe = this.lstFiles.find(
        (file: any) => file.documento === element.documento
      );
      if (existe) {
        filesCargados += 1;
      }
    });

    if (filesCargados !== docObligatorio.length) {
      this.swalService.warning({
        html: 'Documentación requerida para avanzar la actividad ',
      });
      return;
    }

    this.uploadFiles();

    const workflow: IWorlFlow = {
      folio: this.contrato.folio,
      actividadInicial: FnzEActividad.CARGA_DOCUMENTAL,
      actividadFinal: FnzEActividad.VALIDACION_DIGITAL,
      actividad: EstatusBitacoraConsts.EN_PROCESO_DE_GESTION,
      notificacion: EFnzNotificacion.RECEPCION_DOCUMENTOS, //TODO
    };

    await this.workflowService.avanzar(workflow).subscribe((response) => {
      this.swalService
        .success({
          html: 'Información almacenada correctamente, se avanzó la actividad a <b>Validación Documental</b>',
        })
        .then(() => {
          debugger
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
    let contador = 0;
    this.lstFiles.forEach((item) => {
      const formData: FormData = this.setFormData(item);
      const request = new HttpRequest(
        'POST',
        `${environment.urlApi}/core/portal-asegurado`,
        formData
      );
      this.upload_file_masivo(contador, request);
    });
  }

  upload_file_masivo(contador: number, request: any) {
    return new Promise((resolve: any, reject) => {
      this.http
        .request<[]>(request)
        .pipe(
          finalize(() => {
            if (this.lstFiles.length == contador) {
              this.lstFiles = [];
            }
          })
        )
        .subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
              resolve();
            }
          },
          (error) => {
            this.notifierService.error(error?.error?.message, 'Error');
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
