import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme-service';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [ 
    CommonModule 
  ],
  templateUrl: './dark-mode-toggle.html',
  styleUrl: './dark-mode-toggle.scss',
})

export class DarkModeToggleComponent {
  theme = inject(ThemeService);

  toggle() {
    this.theme.toggle();
  }
}
