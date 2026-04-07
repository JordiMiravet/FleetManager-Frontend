import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [ 
    CommonModule 
  ],
  templateUrl: './dark-mode-toggle.html',
  styleUrl: './dark-mode-toggle.css',
})

export class DarkModeToggleComponent {
  isDark = signal(true);

  constructor() {
    this.isDark.set(localStorage.getItem('darkMode') === 'true');
  }

  toggle(event: MouseEvent) {
    event.stopPropagation();

    this.isDark.update(toggleButton => !toggleButton);

    localStorage.setItem('darkMode', String(this.isDark()));
    document.body.classList.toggle('dark-mode', this.isDark());
  }
}
