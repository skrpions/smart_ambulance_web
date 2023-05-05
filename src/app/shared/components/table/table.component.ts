import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { MetaData } from '../../../routes/drivers/views/list-drivers/list-drivers.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() filterValue = '';
  @Input() metaData!: MetaData[];
  @Input() dataSource: any = [];

  // TODO: Lineas para agregar una nueva columna: (actions)
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ContentChildren(MatColumnDef, { descendants: true }) columnDefs!: QueryList<MatColumnDef>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.metaData.map(item => item.columnDb);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // TODO: Método/Estado que usaré para detectar cuando agrego una nueva columna en el componente
  ngAfterContentInit() {
    if (!this.columnDefs) return;

    this.columnDefs.forEach(columnDef => {
      this.displayedColumns.push(columnDef.name);
      this.table.addColumnDef(columnDef);
    });
  }

  select(row: any): void {
    //console.log(row);
  }
}
