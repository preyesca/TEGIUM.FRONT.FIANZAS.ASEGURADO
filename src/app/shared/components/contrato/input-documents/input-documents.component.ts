import { Component, EventEmitter, INJECTOR, Inject, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-documents',
  templateUrl: './input-documents.component.html',
  styleUrls: ['./input-documents.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InputDocumentsComponent),
      multi: true
    }
  ]
})
export class InputDocumentsComponent  implements ControlValueAccessor,OnInit{

  @Input() title:string = ''
  @Input() icon:string = ''

  file_store!: FileList;
  file_array:File[] = [] as File[]
  _control!: NgControl;

  @Input() multiple: boolean = false;
  @Input() accept: string = '';
  @Output() files = new EventEmitter<File[]>();

  constructor(@Inject(INJECTOR) private injector: Injector) {
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  ngOnInit() {
    this._control = this.injector.get(NgControl);
  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this._control.control?.setValue(``);
    }
  }

  clickIcon(input:any){
    input.click()
  }

  writeValue(value: string): void {
    if(this.file_store){
      for (var i = 0; i < this.file_store.length; i++) {
        this.file_array.push(this.file_store[i]);
      }
    }
    this.files.emit(this.file_array)
    this.file_array = []
  }
  registerOnChange(fn:any) {
	}
  registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

  onTouched: () => void = () => {};

}
