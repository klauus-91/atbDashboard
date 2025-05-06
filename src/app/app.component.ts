import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SettingsComponent} from './settings/settings.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'atbDashboard';
}
