import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITitularStorage } from 'src/app/shared/helpers/interfaces/storage/titular.storage';
import { TitularStorageService } from 'src/app/shared/services/storage/titular-storage.service';

interface IContrato {
  id: number;
  folio: string;
  aseguradora: string;
  estado: string;
  accion: string;
}

@Component({
  selector: 'app-contrato',
  templateUrl: './adm-contrato.component.html',
  styleUrls: ['./adm-contrato.component.scss'],
})
export class AdmContratoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  titular: ITitularStorage = <ITitularStorage>{};
  displayColumns = ['folio', 'aseguradora', 'estado', 'accion'];
  dataSource = new MatTableDataSource();
  showFirstLastButtons = true;
  listContratos: any = []

  constructor(
    private router: Router,
    private titularStorageService: TitularStorageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.titular = this.titularStorageService.getInfo();
    this.listContratos = this.titularStorageService.getInfoFolio();
    this.dataSource.data = this.listContratos;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  goToDetailContract(contract: IContrato) {
    this.router.navigateByUrl(
      `administration/mis-contratos/detalles/${contract.folio}`
    );
  }
}
