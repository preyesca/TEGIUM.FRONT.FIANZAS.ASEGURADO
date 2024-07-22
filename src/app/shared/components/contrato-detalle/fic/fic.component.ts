import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { finalize } from 'rxjs';
import { FnzEActividad } from 'src/app/modules/authentication/helpers/enums/fnz-actividad.enum';
import { IContratos } from 'src/app/modules/authentication/helpers/interfaces/login-asegurado';
import { AppConsts } from 'src/app/shared/AppConsts';
import { EstatusBitacoraConsts } from 'src/app/shared/helpers/consts/estatus-bitacora.consts';
import { EDocumento } from 'src/app/shared/helpers/enums/core/documento.enum';
import { IFnzValidacionDigital } from 'src/app/shared/helpers/interfaces/core-firma-cliente';
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
  selector: 'app-fic',
  templateUrl: './fic.component.html',
  styleUrls: ['./fic.component.scss'],
})
export class FicComponent implements OnChanges {
  panelOpenState = false;
  slideCheck = false;
  @Input() configuracion: any;
  @Input() contrato: IContratos = <IContratos>{};
  public fb = inject(FormBuilder);
  frmComentario = {} as FormGroup;
  extencionesPermitidas: string = AppConsts.EXTENSION_PERMITIDOS.EXTENSION;
  lstFIC: any[] = [];
  lstFiles: IArchivo[] = [];
  currentId: string = '';
  firmaDocumental: IFnzValidacionDigital = {};

  checks: any = {
    "FIC": false,
    "Anexo Fic": false
  };

  constructor(
    private formBuilder: FormBuilder,
    private portalService: PortalAseguradoService,
    private readonly notifierService: NotifierService,
    private readonly utilsService: UtilsService,
    private http: HttpClient,
    private router: Router,
    private readonly swalService: SwalService,
    private readonly workflowService: WorkflowService,
    private readonly titularStorage : TitularStorageService
  ) {}

  ngOnChanges(): void {
    // this.portalService.getGeneracionFormatos(this.contrato.folio).subscribe({
    //   next: (response: any) => {
    //     if (response.success) {
    //       const fics = response.data;
    //       const documentos = this.configuracion?.documento;
    //       this.lstFIC = [];
    //       if (documentos != undefined) {
    //         if (fics!.archivoFic) {
    //           const documento = documentos.find(
    //             (element: any) => element.clave === EDocumento.FIC
    //           )?.nombre;
    //           this.lstFIC.push({ id: fics.archivoFic, name: documento });
    //         }
    //         if (
    //           fics!.archivoAnexo != undefined &&
    //           fics!.archivoAnexo != fics.folio
    //         ) {
    //           const documento = documentos.find(
    //             (element: any) => element.documento === EDocumento.ANEXO
    //           )?.nombre;
    //           this.lstFIC.push({ id: fics.archivoAnexo, name: documento });
    //         }
    //       }
    //     }
    //   },
    //   error: (err) => this.notifierService.error(err?.error?.message),
    // });
  }

  ngOnInit(): void {
    this.frmComentario = this.formBuilder.group({
      document: [''],
      comentarios: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  SlideToggle(event: MatSlideToggleChange, documento: string) {
    this.slideCheck = event.checked;
    this.checks[documento] = this.slideCheck;
    if (!this.slideCheck) return;
    this.swalService
      .question({
        text: 'Se está marcando un documento como incorrecto, ¿Está de acuerdo? ',
      })
      .then();
  }

  isValidFiles(): boolean {
    return Object.values(this.checks).some(c => c == true);
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

  selectFile(input: any): void {
    input.click();
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

  download(element: any) {
    let a = document.createElement('a');
    this.portalService.getByArchivo(element.id).subscribe({
      next: (response: IResponse<any>) => {
        if (response.success) {
          let blobFile = this.utilsService.b64toBlob(
            response.data.base64,
            response.data.contentType,
            512
          );
          let urlBlobFile = window.URL.createObjectURL(blobFile);
          a.href = urlBlobFile;
          a.target = '_blank';
          a.download = element.name;
          a.click();
          URL.revokeObjectURL(urlBlobFile);
        }
      },
    });
  }

  showFile(url: string) {
    const urlFile = url.split('/');
    const nombreFile = urlFile[urlFile.length - 1];
    let a = document.createElement('a');
    this.portalService
      .getFileBase64ByFileName(nombreFile, this.contrato.titular)
      .subscribe({
        next: (response: IResponse<any>) => {
          if (response.success) {
            let blobFile = this.utilsService.b64toBlob(
              response.data.fileBase64,
              response.data.type,
              512
            );
            let urlBlobFile = window.URL.createObjectURL(blobFile);
            a.href = urlBlobFile;
            a.target = '_blank';
            a.download = nombreFile;
            a.click();
            URL.revokeObjectURL(urlBlobFile);
          }
        },
      });
  }

  async click_enviar_documentos() {
    if (this.isValidFiles()) {
      this.avanzar_flujo();
    } else {
      let filesCargados = 0;
      const docObligatorio = this.configuracion.documento.filter(
        (element: any) =>
          (element.clave == EDocumento.FIC ||
            element.clave == EDocumento.ANEXO) &&
          element.obligatorio
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

      this.swalService
        .question({
          text: '¿Esta seguro de enviar los documentos?',
        })
        .then((response) => {
          if (response.isConfirmed) {
            this.uploadFiles();
            this.avanzar_flujo();
          }
        });
    }
  }

  async avanzar_flujo() {
    //const notificacion = this.slideCheck ? 0 : EFnzNotificacion.SOLICITUD_FIRMA_EJECUTIVO

    const workflow: IWorlFlow = {
      folio: this.contrato.folio,
      actividadInicial: FnzEActividad.FIRMA_DOCUMENTAL,
      actividadFinal: this.isValidFiles()
        ? FnzEActividad.VALIDACION_DIGITAL
        : FnzEActividad.VALIDACION_FIRMAS,
      actividad: this.isValidFiles()
        ? EstatusBitacoraConsts.EN_VALIDACION_DOCUMENTAL
        : EstatusBitacoraConsts.EN_VALIDACION_DE_FIRMAS,
      //notificacion: notificacion,
      //reproceso: this.slideCheck ? true : false,
      reproceso: this.isValidFiles()
    };

    const actividad = this.isValidFiles()
      ? 'Validacion documental'// ? 'Corrección de formatos'
      : 'Validación de firmas';

    await this.workflowService.avanzar(workflow).subscribe((response) => {
      this.swalService
        .success({
          html: `Información almacenada correctamente, se avanzó la actividad a <b>${actividad}</b>`,
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
    // let contador = 0;
    this.lstFiles.forEach((item, contador) => {
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
              const response = event.body as IResponse<responseFile>; // Conversión de tipo

              if (
                response.data.documento === this.lstFiles[contador].documento
              ) {
                if (EDocumento.FIC === response.data.clave)
                  this.firmaDocumental.archivoFic = response.data._id;

                if (EDocumento.ANEXO === response.data.clave)
                  this.firmaDocumental.archivoAnexo = response.data._id;
              }

              if (contador == this.lstFiles.length - 1) {
                this.saveFirmaDocumental();
              }
            }
          },
          (error) => {
            this.notifierService.error(error?.error?.message, 'Error');
          }
        );
    });
  }

  saveFirmaDocumental() {
    this.portalService
      .getByIdAndGetCatalogosToEditFirmaCliente(this.contrato.folio)
      .subscribe({
        next: (response: IResponse<any>) => {
          if (response.success && response.data !== null) {
            this.currentId = response.data._id;
            this.firmaDocumental.folio = this.contrato.folio;
            if (this.currentId !== '') {
              this.portalService
                .updateFirmaCliente(this.currentId, this.firmaDocumental)
                .subscribe((response) => {});
            }
          } else {
            this.firmaDocumental.folio = this.contrato.folio;
            this.portalService
              .createFirmaCliente(this.firmaDocumental)
              .subscribe((response) => {});
          }
        },
        error: (err) =>
          this.notifierService.error(err?.error?.message, 'Error'),
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
}
