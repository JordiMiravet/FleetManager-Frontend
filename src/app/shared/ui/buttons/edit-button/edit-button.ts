import { Component, output } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [],
  templateUrl: './edit-button.html',
  styleUrl: './edit-button.scss',
})
export class EditButtonComponent {

  readonly edit = output<void>()

  onClick(): void {
    this.edit.emit();
  }

}
