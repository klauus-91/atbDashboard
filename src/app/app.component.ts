import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SettingsComponent} from './settings/settings.component';
import {filter} from 'rxjs';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SettingsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'atbDashboard';

  mainClass = 'container'

  constructor(private router: Router) {
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const hiddenRoutes = ['/login', '/register']; // add more if needed
      this.mainClass = !hiddenRoutes.includes(event.urlAfterRedirects) ? 'container' : 'container-fluid';
    });
  }

}
