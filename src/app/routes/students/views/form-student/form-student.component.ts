import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students-views-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
})
export class StudentsViewsFormStudentComponent {
  icon_header = 'toys';
  title_header: string;
  form!: FormGroup;
  image = '';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reference: MatDialogRef<StudentsViewsFormStudentComponent>
  ) {
    console.log('data', data);

    this.title_header = data ? 'Edit' : 'New'; // TODO: Estos textos deben ser dinámicos.
    this.image = data
      ? 'assets/images/avatar.jpg'
      : 'https://images.unsplash.com/photo-1683220643085-1fa0ad87a1a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.nonNullable.group({
      id: this.data?.id,
      name: [this.data?.name, [Validators.required, Validators.maxLength(40)]],
      username: [this.data?.username, [Validators.required, Validators.maxLength(40)]],
      email: [this.data?.email, [Validators.required, Validators.email]],
      phone: [this.data?.phone, [Validators.required, Validators.maxLength(40)]],
      website: [this.data?.website, [Validators.required, Validators.maxLength(40)]],
      company: [this.data?.company, [Validators.required, Validators.maxLength(40)]],
      city: [this.data?.city, [Validators.required, Validators.maxLength(40)]],
    });
  }

  save() {
    const record = this.form.value;
    this.reference.close(record);
  }
}
