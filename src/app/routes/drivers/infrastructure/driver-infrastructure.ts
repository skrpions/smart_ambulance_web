import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Driver } from '../domain/driver';

export interface ResultPage<Entity> {
  records: Entity[];
  totalRecords: number;
}
@Injectable()
export class DriverInfrastructure {
  private accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODMxNzY1NDAsImV4cCI6MTY4MzE3NzE0MCwibmFtZSI6IlNlcmdpbyBIaWRhbGdvIiwiZW1haWwiOiJzZXJnaW9AY29ycmVvLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFUT1IiXX0.l_df173MErk9TmqjkTgZ9Yls045O1xvR89tQM4zWgGc';
  //private accessToken = this.storageApplication.getField('accessToken-test');
  constructor(
    private readonly http: HttpClient //private readonly storageApplication: StorageApplication
  ) {}

  list(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.apiPath}/drivers`, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  listOne(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  insert(entity: Partial<Driver>): Observable<Driver> {
    return this.http.post<Driver>(`${environment.apiPath}/drivers`, entity, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  update(id: number, entity: Partial<Driver>): Observable<Driver> {
    return this.http.put<Driver>(`${environment.apiPath}/drivers/${id}`, entity, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Driver>(`${environment.apiPath}/drivers/${id}`, {
      headers: { authorization: 'Bearer ' + this.accessToken },
    });
  }

  page(pageIndex: number, pageSize: number): Observable<ResultPage<Driver>> {
    return this.http.get<ResultPage<Driver>>(
      `${environment.apiPath}/drivers/page/${pageIndex}/${pageSize}`,
      { headers: { authorization: 'Bearer ' + this.accessToken } }
    );
  }
}
