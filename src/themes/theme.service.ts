import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = false;

  setDarkTheme(isDark: boolean): void {
    this.isDarkTheme = isDark;
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);
  }

  isDarkMode(): boolean {
    return this.isDarkTheme;
  }
}