import { Component,inject,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentosPermitidosModalComponent } from '../documentos-permitidos-modal/documentos-permitidos-modal.component';
import { DocumentData } from 'src/app/shared/helpers/data/document.data';

@Component({
  selector: 'app-allowed-documents',
  templateUrl: './allowed-documents.component.html',
  styleUrls: ['./allowed-documents.component.scss'],
})
export class AllowedDocumentsComponent {
  @Input() listDocumentsAllowed: any[] = [];
  @Input() document: string = '';

  public dialog = inject(MatDialog)
  openModal(){
    const info = DocumentData.hashTable[this.document];
    const dialogRef = this.dialog.open(DocumentosPermitidosModalComponent, {
      panelClass: 'container-modal',
      autoFocus: false,
      data: {
        images: info ? info.images : [],
        description: info ? info.description : '',
      },
    });
  }

  getDescription(document: string): string {
    const data = DocumentData.hashTable[document];
    return data ? data.description : '';
  }

  getLanguage(field:string) {
    return `${field}`;
  }

}


