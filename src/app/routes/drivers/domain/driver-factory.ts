import { Driver, DriverProperties } from './driver';

export class DriverFactory {
  static create(nombre: string): Driver {
    const driverProperties: DriverProperties = {
      nombre,
    };

    if (nombre.trim() === '') {
      throw new Error('El nombre del conductor no puede estar vacio');
    }

    return new Driver(driverProperties);
  }
}
