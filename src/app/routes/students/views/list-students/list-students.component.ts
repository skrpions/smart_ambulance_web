import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@shared/services/utils.service';
import {
  ExportOptions,
  MetaData,
  Modal,
} from 'app/routes/drivers/views/list-drivers/list-drivers.component';
import { ToastrService } from 'ngx-toastr';
import { StudentApplication } from '../../application/student-application';
import { StudentEntity } from '../../domain/entities/student-entity';
import { StudentsViewsFormStudentComponent } from '../form-student/form-student.component';

export type Messages = {
  confirm: string;
  insert: string;
  update: string;
  delete: string;
};

@Component({
  selector: 'app-students-views-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class StudentsViewsListStudentsComponent {
  icon_header = 'school';
  title_header = 'titles.students';

  modal: Modal = {
    component: StudentsViewsFormStudentComponent,
    width: '800px',
  };
  messages: Messages = {
    confirm: 'status_messages.confirmation_question',
    insert: 'status_messages.added',
    update: 'status_messages.updated',
    delete: 'status_messages.deleted',
  };
  metaData: MetaData[] = [
    { columnDb: 'id', customTitleColumn: 'ID' },
    { columnDb: 'name', customTitleColumn: 'NOMBRE' },
    { columnDb: 'username', customTitleColumn: 'USUARIO' },
    { columnDb: 'email', customTitleColumn: 'EMAIL' },
    { columnDb: 'phone', customTitleColumn: 'TELEFONO' },
    { columnDb: 'website', customTitleColumn: 'SITIO WEB' },
    { columnDb: 'company', customTitleColumn: 'COMPAÑIA' },
    { columnDb: 'city', customTitleColumn: 'CIUDAD' },
  ];
  exportOptions: ExportOptions = {
    fileName: 'students_2023',
    sheetName: 'students',
  };

  filterValue = '';
  totalRecords = 0;

  dataSource: StudentEntity[] = [];
  dataSourceClone: StudentEntity[] = [];

  constructor(
    private readonly studentApplication: StudentApplication,
    private utilsSvc: UtilsService,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    this.getAll();
  }

  getAll() {
    this.studentApplication.list().subscribe({
      next: students => {
        this.dataSourceClone = this.transformData(students); // Inicializar this.dataSourceClone con los datos originales sin filtrar
        this.dataSource = [...this.dataSourceClone]; // Inicializar this.dataSource con los datos originales sin filtrar
        this.totalRecords = this.dataSource.length;
      },
    });
  }

  transformData(students: StudentEntity[]): StudentEntity[] {
    return students.map((student: StudentEntity) => {
      const modifiedStudent: any = { ...student }; // Copia del objeto student
      modifiedStudent.company = modifiedStudent.company.name; // Asigna el nombre de la compañía
      modifiedStudent.city = modifiedStudent.address.city; // Asigna el nombre de la ciudad
      return modifiedStudent;
    });
  }

  applyFilter(event: any | null) {
    if (event && event.target && event.target.value) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = filterValue.trim().toLowerCase();

      if (this.filterValue === '') {
        this.dataSource = [...this.dataSourceClone]; // Restaurar los datos originales sin filtrar
      } else {
        this.dataSource = this.dataSourceClone.filter((student: StudentEntity) =>
          student?.name.toLowerCase().includes(this.filterValue)
        );
      }
    }
  }

  openForm(row: StudentEntity = null!) {
    console.log('row', row);
    const reference = this.utilsSvc.openForm(this.modal.component, this.modal.width, row);

    reference.subscribe(response => {
      if (!response) return;

      const id = response.id;
      delete response.id;

      if (id) {
        // Update entity
        this.studentApplication.update(id, response).subscribe({
          next: () => {
            this.toast.success(this.translate.instant(this.messages.update));
          },
        });
      } else {
        // New entity
        this.studentApplication.insert(response).subscribe({
          next: () => {
            this.toast.success(this.translate.instant(this.messages.insert));
          },
        });
      }
    });
  }

  delete(id: number, record = '') {
    console.log('id', id + ' - ' + 'record', record);
    const confirmMessage = [this.messages.confirm, record];
    this.utilsSvc.confirm(confirmMessage).subscribe(response => {
      if (response) {
        this.studentApplication.delete(id).subscribe({
          next: () => {
            this.toast.success(this.translate.instant(this.messages.delete));
          },
        });
      }
    });
  }

  exportToExcel() {
    this.utilsSvc.exportDataToExcel(
      this.dataSource,
      this.metaData,
      this.exportOptions.fileName,
      this.exportOptions.sheetName
    );
  }
}
