import { Component,EventEmitter,Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-files-table',
  templateUrl: './files-table.component.html',
  styleUrls: ['./files-table.component.scss']
})
export class FilesTableComponent implements OnChanges{
  @Input() listFiles:File[] = []
  @Output() filesUpdates = new EventEmitter<File[]>();

  displayColumns = ['nombre', 'accion'];

  dataSourceNewContracts = new MatTableDataSource();

  ngOnInit(){
    this.dataSourceNewContracts = new MatTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges){
    this.dataSourceNewContracts.data = this.listFiles.map(file=>{
      return {
        nombre: file.name,
        accion: ''
      }
    })
  }

  downloadFile(file:any){
    let fileSelected = this.listFiles.find(item=> item.name === file.nombre)
    let fileURL = URL.createObjectURL(new Blob([fileSelected!], { type: fileSelected?.type }));
    let a = document.createElement('a');
      a.href = fileURL;
      a.target = '_blank';
      // a.download = fileSelected?.name!;
      document.body.appendChild(a);
      a.click();
  }

  deleteFile(file:any){
    const arrayNew = this.listFiles.filter(item=>item.name !== file.nombre)
    this.filesUpdates.emit(arrayNew)
  }
}
