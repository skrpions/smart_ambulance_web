import { Observable } from 'rxjs';
import { Driver } from './driver';

export interface DriverRepository {
  list(): Observable<Driver[]>;
  listOne(id: number): Observable<Driver>;
  insert(driver: Partial<Driver>): Observable<Driver>;
  update(id: number, driver: Partial<Driver>): Observable<Driver>;
  delete(id: number): Observable<Driver>;
  page(page: number, pageSize: number): Observable<any>;
}
