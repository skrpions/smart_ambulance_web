import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DriversRoutingModule } from './drivers-routing.module';
import { FormDriverComponent } from './views/form-driver/form-driver.component';
import { ListDriversComponent } from './views/list-drivers/list-drivers.component';

const COMPONENTS: any[] = [ListDriversComponent, FormDriverComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, DriversRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ListDriversComponent, FormDriverComponent],
})
export class DriversModule {}
