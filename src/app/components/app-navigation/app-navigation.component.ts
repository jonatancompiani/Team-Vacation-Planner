import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from 'src/themes/theme.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-app-navigation',
    templateUrl: './app-navigation.component.html',
    styleUrls: ['./app-navigation.component.scss'],
    standalone: false
})
export class AppNavigationComponent {

  isDarkMode = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private themeService: ThemeService,
        private router: Router
  ) {}

  toggleTheme(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    this.themeService.setDarkTheme(isDarkMode);
  }

  goHome(): void {
    this.router.navigate(["/"]);
  }
}
