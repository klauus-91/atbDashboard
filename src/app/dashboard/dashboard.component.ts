import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements  OnInit {

  branches$!: Observable<any>;
  ATM$!: Observable<any>;
  selectedBranch!: number;
  selectedAtm!: number;
  config = {
    diplayATMSelect: false,
    displayDashboard: false,
  }
  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.branches$ = this.api.getBranch();

  }


  selectBranches($event: Event) {
    console.log(($event.target as HTMLSelectElement).value);
    this.selectedBranch = +($event.target as HTMLSelectElement).value;
    this.ATM$ = this.api.getATMs(this.selectedAtm);
    this.config.diplayATMSelect = true;

  }

  selelctAtm($event: Event) {
    this.selectedAtm = +($event.target as HTMLSelectElement).value;
    this.config.displayDashboard = true;
  }
}
