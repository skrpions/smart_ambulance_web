import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentEntity } from '../domain/entities/student-entity';

@Injectable()
export class StudentInfrastructure {
  private apiPath = 'https://jsonplaceholder.typicode.com';
  private endPoint = 'users';

  constructor(private readonly http: HttpClient) {}

  list(): Observable<StudentEntity[]> {
    return this.http.get<StudentEntity[]>(`${this.apiPath}/${this.endPoint}`);
  }

  listOne(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  insert(student: Partial<StudentEntity>): Observable<StudentEntity> {
    return this.http.post<StudentEntity>(`${this.apiPath}/${this.endPoint}`, student);
    /* return this.http.post<StudentEntity>(`${this.apiPath}/${this.endPoint}`, student, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    }); */
  }

  update(id: number, student: Partial<StudentEntity>): Observable<StudentEntity> {
    return this.http.put<StudentEntity>(`${this.apiPath}/${this.endPoint}/${id}`, student);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<StudentEntity>(`${this.apiPath}/${this.endPoint}/${id}`);
  }
}
