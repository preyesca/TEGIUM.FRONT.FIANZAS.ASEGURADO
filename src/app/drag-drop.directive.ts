import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
  @Output() filesDropped = new EventEmitter();
  @Output() filesHovered = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event'])
    onDragOver($event: any) {
      $event.preventDefault();
      this.filesHovered.emit(true)
    }
  
  @HostListener('drageleave', ['$event'])
    onDragLeave($event: any) {
      $event.preventDefault();
      this.filesHovered.emit(false)
    }

  @HostListener('drop', ['$event'])
    onDrop($event: any) {
      $event.preventDefault();
      this.filesDropped.emit($event.dataTransfer.files);
      this.filesHovered.emit(false);

    }

}