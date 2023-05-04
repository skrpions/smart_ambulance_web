interface DriverEssentials {
  nombre: string;
}
interface DriverOptionals {
  id: number;
  activo: boolean;
}

export type DriverProperties = Required<DriverEssentials> & Partial<DriverOptionals>;
export type DriverUpdate = Partial<DriverEssentials>;

export class Driver {
  private readonly id!: number;
  private nombre!: string;
  private activo!: boolean;

  constructor(properties: DriverProperties) {
    Object.assign(this, properties);
    this.activo = true;
  }

  properties(): DriverProperties {
    return {
      id: this.id,
      nombre: this.nombre,
      activo: this.activo,
    };
  }

  update(properties: DriverUpdate) {
    Object.assign(this, properties);
  }

  delete(): void {
    this.activo = false;
  }
}
