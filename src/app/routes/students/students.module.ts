import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsViewsListStudentsComponent } from './views/list-students/list-students.component';
import { StudentsViewsFormStudentComponent } from './views/form-student/form-student.component';

const COMPONENTS: any[] = [StudentsViewsListStudentsComponent];
const COMPONENTS_DYNAMIC: any[] = [StudentsViewsFormStudentComponent];

@NgModule({
  imports: [SharedModule, StudentsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class StudentsModule {}
