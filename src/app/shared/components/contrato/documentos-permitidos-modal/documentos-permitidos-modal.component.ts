import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { register,SwiperContainer } from 'swiper/element/bundle';
register()
@Component({
  selector: 'app-documentos-permitidos-modal',
  templateUrl: './documentos-permitidos-modal.component.html',
  styleUrls: ['./documentos-permitidos-modal.component.scss']
})
export class DocumentosPermitidosModalComponent {

  constructor(public dialogRef: MatDialogRef<DocumentosPermitidosModalComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  return(){
    const swiper = document.querySelector('swiper-container') as SwiperContainer;
    swiper?.swiper.slidePrev();
  }

  next(){
    const swiper = document.querySelector('swiper-container') as SwiperContainer;
    swiper?.swiper.slideNext();
  }

  accept(){
    this.dialogRef.close()
  }
}
