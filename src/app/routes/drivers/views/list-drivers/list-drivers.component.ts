import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UtilsService } from '@shared/services/utils.service';
import { DriverApplication } from '../../application/driver-application';
import { Driver } from '../../domain/driver';
import { ResultPage } from '../../infrastructure/driver-infrastructure';

export type ExportOptions = {
  fileName: string;
  sheetName: string;
};

export type Messages = {
  confirm: string;
  insert: string;
  update: string;
  delete: string;
};

export type Modal = {
  component: any;
  width: string;
};

export interface MetaData {
  //TODO: Esta clase es creada para darles nombres personalizados a las columnas de la tabla: Video # 7: 02h:13m:14s
  columnDb: string; // ColumnDb se refiere al nombre de la columna en la base de datos
  customTitleColumn: string; // ColumnTitleColumn se refiere al nombre personalizado que le daré a las columnas de la mat-table
}

@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.scss'],
})
export class ListDriversComponent {
  icon_header = 'code';
  title_header = 'titles.projects';
  driverList: Driver[] = [];
  metaData: MetaData[] = [
    { columnDb: 'id', customTitleColumn: 'ID' },
    { columnDb: 'nombre', customTitleColumn: 'NOMBRE' },
    { columnDb: 'activo', customTitleColumn: 'ACTIVO' },
  ];
  exportOptions: ExportOptions = {
    fileName: 'drivers',
    sheetName: 'drivers',
  };

  currentPage = 0;

  filterValue = '';
  totalRecords = 0;
  page_size = 5;
  page_index = 0;
  dataSource: Driver[] = [];
  dataSourceClone: Driver[] = [];
  objectPagination: PageEvent = {
    previousPageIndex: 0,
    pageIndex: this.page_index,
    pageSize: this.page_size,
    length: this.dataSource.length,
  };

  constructor(
    private readonly driverApplication: DriverApplication,
    private utilsSvc: UtilsService
  ) {
    this.changePage(this.objectPagination);
    this.getAll();
  }

  ngOnInit() {}

  getAll() {
    this.driverApplication.list().subscribe({
      next: data => {
        /* this.driverList = data;
        console.log('✅', this.driverList); */
        this.dataSourceClone = data;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();

    if (this.filterValue === '') {
      const objectPaginationWithCurrentPage = {
        previousPageIndex: 0,
        pageIndex: 0,
        pageSize: this.page_size,
        length: this.dataSource.length,
      };
      this.changePage(objectPaginationWithCurrentPage);
    } else {
      this.dataSource = this.dataSourceClone.filter((driver: Driver) =>
        driver?.nombre.toLowerCase().includes(this.filterValue)
      );
      this.totalRecords = this.dataSource.length;
    }
  }

  changePage(event: PageEvent) {
    this.driverApplication.page(event.pageIndex, event.pageSize).subscribe({
      next: (data: ResultPage<Driver>) => {
        this.dataSource = data.records;
        this.totalRecords = data.totalRecords;
        this.currentPage = event.pageIndex;
        this.page_size = event.pageSize;
      },
    });
  }

  openForm(row: Driver = null!) {
    console.log('row', row);

    /* const reference = this.utilsSvc.openForm(this.modal.component, this.modal.width, row);
    const objectPaginationWithCurrentPage = {
      previousPageIndex: 0,
      pageIndex: this.currentPage,
      pageSize: this.page_size,
      length: this.dataSource.length,
    };

    reference.subscribe(response => {
      if (!response) return;

      const id = response.id;
      delete response.id;

      if (id) {
        // Update entity
        this.driverApplication.update(id, response).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.update));
          },
        });
      } else {
        // New entity
        this.driverApplication.insert(response).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.insert));
          },
        });
      }
    }); */
  }

  delete(id: number, record = '') {
    console.log('id', id + 'record', record);

    /* const confirmMessage = [this.messages.confirm, record];
    const objectPaginationWithCurrentPage = {
      previousPageIndex: 0,
      pageIndex: this.currentPage,
      pageSize: this.page_size,
      length: this.dataSource.length,
    };
    this.utilsSvc.confirm(confirmMessage).subscribe(response => {
      if (response) {
        this.driverApplication.delete(id).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.delete));
          },
        });
      }
    }); */
  }

  exportToExcel() {
    this.driverApplication.list().subscribe({
      next: (data: Driver[]) => {
        this.utilsSvc.exportDataToExcel(
          data,
          this.metaData,
          this.exportOptions.fileName,
          this.exportOptions.sheetName
        );
      },
    });
  }
}
