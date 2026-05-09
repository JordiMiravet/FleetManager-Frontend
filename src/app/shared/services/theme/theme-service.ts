import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal(true);

  constructor() {
    const storedDarkMode = localStorage.getItem('darkMode');

    const initialValue =
      storedDarkMode === null
        ? true
        : storedDarkMode === 'true';

    this.isDark.set(initialValue);

    effect(() => {
      const isDark = this.isDark();

      localStorage.setItem('darkMode', String(isDark));
      document.body.classList.toggle('dark-mode', isDark);
    });
  }

  toggle() {
    this.isDark.update((isDark) => !isDark);
  }
}