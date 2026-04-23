import { Component, output } from '@angular/core';

@Component({
  selector: 'app-user-button',
  imports: [],
  templateUrl: './user-button.html',
  styleUrl: './user-button.scss',
})
export class UserButtonComponent {

  readonly user = output<void>();

  onClick(): void {
    this.user.emit();
  }

}
