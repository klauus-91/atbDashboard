import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-filter',
  imports: [
    FormsModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  branches$!: Observable<any>;
  ATM$!: Observable<any>;
  year$!: Observable<number[]>;
  zones$!: Observable<any[]>;


  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = 0;
  allMonths: number[] = [
    1,2,3,4,5,6,7,8,9,10,11,12
  ];
  selectedZone!: string;
  selectedBranch: number = 0;
  selectedAtm: number = 0;
  selectedDate!: string;


  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.branches$ = this.api.getBranch();
    this.year$ = this.api.getYear();
    this.year$.subscribe(year => {
      console.log(year);
    })
    this.zones$ = this.api.getZones();
  }
  selectYear($event: Event) {
    this.selectedYear =  +($event.target as HTMLSelectElement).value;
    console.log(this.selectedYear);
  }

  selectMonth($event: Event) {
    this.selectedMonth =  +($event.target as HTMLSelectElement).value;
  }

  selectZone($event: Event) {
    this.selectedZone = ($event.target as HTMLSelectElement).value;
    if (!this.selectedZone) this.selectedBranch = 0; this.selectedAtm = 0;
    console.log(this.selectedZone);
  }
  selectBranches($event: Event) {
    this.selectedBranch = +$event;
    console.log(this.selectedBranch);
    this.ATM$ = this.api.getATMs(this.selectedAtm);
  }

  selectAtm($event: Event) {
    console.log($event);
  }
}
