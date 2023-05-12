import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsViewsFormStudentComponent } from './form-student.component';

describe('StudentsViewsFormStudentComponent', () => {
  let component: StudentsViewsFormStudentComponent;
  let fixture: ComponentFixture<StudentsViewsFormStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsViewsFormStudentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsViewsFormStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
