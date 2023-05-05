import { Inject, Injectable } from '@angular/core';
import { StorageRepository } from '../domain/storage-repository';
import { StorageInfrastructure } from '../infrastructure/storage-infrastructure';

@Injectable()
export class StorageApplication {
  constructor(@Inject(StorageInfrastructure) private storageRepository: StorageRepository) {}

  getField(key: string): string | null {
    return this.storageRepository.get(key);
  }

  setField(key: string, value: any): void {
    this.storageRepository.set(key, value);
  }

  clearField(): void {
    this.storageRepository.clear();
  }
}
