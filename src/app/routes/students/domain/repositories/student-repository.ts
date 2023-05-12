import { Observable } from 'rxjs';
import { StudentEntity } from '../entities/student-entity';

export interface StudentRepository {
  list(): Observable<StudentEntity[]>;
  listOne(id: number): Observable<any>;
  insert(entity: Partial<StudentEntity>): Observable<StudentEntity>;
  update(id: number, entity: Partial<StudentEntity>): Observable<StudentEntity>;
  delete(id: number): Observable<any>;
}
