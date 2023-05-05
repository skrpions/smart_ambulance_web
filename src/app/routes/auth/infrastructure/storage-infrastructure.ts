import { Injectable } from '@angular/core';
import { StorageRepository } from '../domain/storage-repository';

@Injectable()
export class StorageInfrastructure implements StorageRepository {
  get(key: string): string | null {
    return localStorage.getItem(key);
  }
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  clear(): void {
    localStorage.clear();
  }
}
