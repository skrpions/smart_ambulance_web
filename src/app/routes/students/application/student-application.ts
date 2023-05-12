import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentEntity } from '../domain/entities/student-entity';
import { StudentRepository } from '../domain/repositories/student-repository';
import { StudentInfrastructure } from '../infrastructure/student-infrastructure';

@Injectable()
export class StudentApplication {
  constructor(
    @Inject(StudentInfrastructure) private readonly studentRepository: StudentRepository
  ) {}

  list(): Observable<StudentEntity[]> {
    return this.studentRepository.list();
  }

  insert(entity: Partial<StudentEntity>) {
    return this.studentRepository.insert(entity);
  }

  update(id: number, entity: Partial<StudentEntity>): Observable<StudentEntity> {
    return this.studentRepository.update(id, entity);
  }

  delete(id: number): Observable<any> {
    return this.studentRepository.delete(id);
  }
}
