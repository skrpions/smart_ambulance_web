import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../domain/driver';
import { DriverRepository } from '../domain/driver-repository';
import { DriverInfrastructure } from '../infrastructure/driver-infrastructure';

@Injectable()
export class DriverApplication {
  constructor(@Inject(DriverInfrastructure) private readonly driverRepository: DriverRepository) {}

  list() {
    return this.driverRepository.list();
  }

  insert(entity: Partial<Driver>) {
    return this.driverRepository.insert(entity);
  }

  update(id: number, entity: Partial<Driver>): Observable<Driver> {
    return this.driverRepository.update(id, entity);
  }

  delete(id: number) {
    return this.driverRepository.delete(id);
  }

  page(pageIndex: number, pageSize: number): Observable<any> {
    return this.driverRepository.page(pageIndex, pageSize);
  }
}
