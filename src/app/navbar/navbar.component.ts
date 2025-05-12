import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'div-navbar',
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  showNavbar = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const hiddenRoutes = ['/login', '/register']; // add more if needed
      this.showNavbar = !hiddenRoutes.includes(event.urlAfterRedirects);
    });
  }
}
