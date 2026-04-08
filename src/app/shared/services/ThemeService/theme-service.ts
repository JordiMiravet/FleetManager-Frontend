import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem('darkMode');

    const initialValue = saved !== null 
        ? saved === 'true' 
        : true;

    this.isDark.set(initialValue);

    effect(() => {
      const value = this.isDark();

      localStorage.setItem('darkMode', String(value));
      document.body.classList.toggle('dark-mode', value);
    });
  }

  toggle() {
    this.isDark.update(v => !v);
  }
}