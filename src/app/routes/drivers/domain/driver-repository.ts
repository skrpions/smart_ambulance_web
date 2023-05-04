import { Driver } from './driver';

export interface DriverRepository {
  list(): Driver;
}
