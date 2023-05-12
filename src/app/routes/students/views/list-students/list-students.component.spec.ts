import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsViewsListStudentsComponent } from './list-students.component';

describe('StudentsViewsListStudentsComponent', () => {
  let component: StudentsViewsListStudentsComponent;
  let fixture: ComponentFixture<StudentsViewsListStudentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsViewsListStudentsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsViewsListStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
