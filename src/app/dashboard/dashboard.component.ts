import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from '../footer/footer.component';
import {Chart, registerables} from 'chart.js';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FooterComponent,
    FormsModule,
    CanvasJSAngularChartsModule,
    FilterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements  OnInit {

  @ViewChild('totalAmountCharged') canvasRef!: ElementRef;
  chart: Chart | undefined;


  /*Observable*/
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
  totalAmountCharged$!: Observable<number>;
  config = {
    diplayATMSelect: false,
    displayDashboard: false,
  }



  /* charts **/

  chartOptions = {
    title: {
      text: ""
    },
    backgroundColor: '#0b1727',
    width:1000,
    theme: "dark2",
    axisY: {
      title: "Amount in DT"
    },
    toolTip: {
      content: "{label}: {y} DT"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Grand Tunis",  y: 280  },
        { label: "Center", y: 70  },
        { label: "North", y: 60  },
        { label: "South",  y: 23  },
      ]
    }]
  };


  constructor(private api: ApiService) {
    Chart.register(...registerables); // Important: Register Chart.js components
  }

  ngOnInit() {
    this.branches$ = this.api.getBranch();
    this.year$ = this.api.getYear();
    this.zones$ = this.api.getZones();
    this.totalAmountCharged$ = this.api.getTotalAmountChargedByYear(2025);
  }

  getMonths(count: number): string[] {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.slice(0, count);
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

  dateChange() {
    const [year, month, day] = this.selectedDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    console.log('Selected date:', formattedDate);
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
}
