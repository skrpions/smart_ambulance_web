import { Component } from '@angular/core';
import { DriverApplication } from '../../application/driver-application';
import { Driver } from '../../domain/driver';

@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.scss'],
})
export class ListDriversComponent {
  driverList: Driver[] = [];

  constructor(private readonly driverApplication: DriverApplication) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.driverApplication.list().subscribe({
      next: data => {
        this.driverList = data;
        console.log('✅', this.driverList);
      },
    });
  }
}
