import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  icon_header = 'notification_important';
  title_header = 'titles.elimination';
  messages: string[] = []; // ['¿Está seguro de eliminar el registro?', 'Juan Perez'];
  question = ''; // '¿Está seguro de eliminar el registro?';
  name = ''; // 'Juan Perez';

  ngAfterContentInit(): void {
    this.question = this.messages[0];
    this.name = this.messages[1];
  }
}
