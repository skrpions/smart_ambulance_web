import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';
import { MetaData } from 'app/routes/drivers/views/list-drivers/list-drivers.component';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly dialog = inject(MatDialog);

  constructor() {}

  // Delete
  /* confirm(message: string[] = []): Observable<any> {
    const reference: MatDialogRef<ConfirmComponent> = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '400px',
    });

    if (message.length > 0) reference.componentInstance.messages = message;

    return reference.afterClosed();
  } */

  // Export
  exportDataToExcel<Driver>(
    records: Driver[],
    metaData: MetaData[],
    fileName: string,
    sheetName: string
  ) {
    const result = this.dtoExcel(records, metaData); // Obtengo la data transformada
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]); // Creo una hoja de excel vacia
    XLSX.utils.sheet_add_json(workSheet, result); // Relaciono el json con la hoja de excel existente
    const workBook: XLSX.WorkBook = XLSX.utils.book_new(); // Creo un nuevo libro
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName); // Al libro de excel le agregó la hoja de excel
    XLSX.writeFile(workBook, `${fileName}.xlsx`);
  }

  private dtoExcel<Entity>(records: Entity[], metaData: MetaData[]) {
    return records.map((item: Entity) => {
      const newElement: any = {};

      for (const key in item) {
        const metaInfo = metaData.find((metaData: MetaData) => metaData.columnDb === key);
        if (metaInfo) {
          newElement[metaInfo.customTitleColumn] = item[key];
        }
      }

      return newElement;
    });
  }
}
