import {Component, OnInit, EventEmitter, Output} from '@angular/core';
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

  selectedYear = 0;
  selectedMonth: string = "00";
  allMonths: string[] = [
    '01','02','03','04','05','06','07','08','09','10','11','12'
  ];
  selectedZone!: string;
  selectedBranch: number = 0;
  selectedAtm: number = 0;
  selectedDate!: string;

  @Output() selectionChanged = new EventEmitter<any>();

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.branches$ = this.api.getBranch('');
    this.year$ = this.api.getYear();
    this.zones$ = this.api.getZones();
    this.emitSelection();
  }
  selectYear($event: Event) {
    this.selectedYear =  +($event.target as HTMLSelectElement).value
    this.emitSelection();
  }

  selectMonth($event: Event) {
    this.selectedMonth =  ($event.target as HTMLSelectElement).value;
    this.emitSelection();
  }

  selectZone($event: Event) {
    this.selectedZone = ($event.target as HTMLSelectElement).value;
    if (!this.selectedZone) this.selectedBranch = 0; this.selectedAtm = 0;
    this.branches$ = this.api.getBranch(this.selectedZone);
    this.emitSelection();
  }
  selectBranches($event: Event) {
    this.selectedBranch = +$event;
    this.ATM$ = this.api.getATMs(this.selectedBranch);
    this.emitSelection();
  }

  selectAtm($event: Event) {
    console.log($event);
    this.emitSelection();
  }

  emitSelection() {
    this.selectionChanged.emit({
      year: this.selectedYear,
      month: this.selectedMonth,
      zone: this.selectedZone,
      branch: this.selectedBranch,
      atm: this.selectedAtm
    })
  }
}
