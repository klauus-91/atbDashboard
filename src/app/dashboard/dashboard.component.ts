import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {BehaviorSubject, Observable, Subscription, combineLatest, switchMap} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from '../footer/footer.component';
import {Chart, registerables} from 'chart.js';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {FilterComponent} from '../filter/filter.component';
import { PrettyLabelPipe } from '../pipes/pretty-label.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FooterComponent,
    FormsModule,
    CanvasJSAngularChartsModule,
    FilterComponent,
    PrettyLabelPipe,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements  OnInit, OnDestroy {

  @ViewChild('totalAmountCharged') canvasRef!: ElementRef;
  chart: Chart | undefined;


  /*Observable*/
  branches$!: Observable<any>;
  ATM$!: Observable<any>;
  year$!: Observable<number[]>;
  zones$!: Observable<any[]>;


  selectedYear$ = new BehaviorSubject<number>(0);
  selectedMonth$ = new BehaviorSubject<number>(0);
  chartType$ = new BehaviorSubject<string>('totalAmountCharged');
  topAgency$!: Observable<any>;

  allMonths: number[] = [
    1,2,3,4,5,6,7,8,9,10,11,12
  ];
  selectedZone!: string;
  selectedBranch: number = 0;
  selectedAtm: number = 0;
  selectedDate!: string;
  totalAmounts$!: Observable<any>;
  topAgencyFilter: string = 'totalAmountCharged'; // Default filter type for top agency chart

  config = {
    diplayATMSelect: false,
    displayDashboard: false,
  }

  chartType: string = 'totalAmountCharged'; // Default chart type
  getChartDataSub$ = new Subscription();

  /* charts **/

  chartOptions = {
    title: {
      text: ""
    },
    backgroundColor: '#0b1727',
    width:1000,
    theme: "dark2",
    axisY: {
      title: "Amount in M"
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
  
   
    this.getDashboardData();
  }
  onSelectionChanged(event: any) {
    this.selectedYear$.next(event.year);
    this.selectedMonth$.next(event.month);
    this.selectedZone = event.zone;
    this.selectedBranch = event.branch;
    this.selectedAtm = event.atm;
    
    
   this.getDashboardData();
    
  }

  chartTypeChanged(event: any) {
    console.log('Chart type changed:', this.chartType);
    this.chartType$.next(this.chartType);
    this.getDashboardData();
  }
  getDashboardData() {
    this.getChartData();
    this.getAmountsData();
    this.getTopAgency();

  }

  getTopAgency() {
    const inputs = {
      year: this.selectedYear$.value,
      month: this.selectedMonth$.value,
      value: this.topAgencyFilter
    };
    this.topAgency$ = this.api.topAgencies(inputs);
  }
  getAmountsData() {
    const inputs = {
      year: this.selectedYear$.value,
      month: this.selectedMonth$.value,
      zone: this.selectedZone,
      branchId: this.selectedBranch,
      atmId: this.selectedAtm,
    
    }
  
    this.totalAmounts$ = this.api.getTotalAmountCharged(inputs);
    this.totalAmounts$.subscribe(amount => {console.log('Total Amount Charged:', amount);});    
  }

  topAgencyFilterChanged(event: any) {
    console.log(this.topAgencyFilter)
    this.getTopAgency();
  }
  getChartData() {
    this.getChartDataSub$ =  combineLatest([
      this.selectedYear$,
      this.selectedMonth$,
      this.chartType$
    ])
    .pipe(
      switchMap(([year, month, chartType]) => {
        const inputs = { year, month, chartType };
        return this.api.getLiquidityChartData(inputs);
      })
    )
    .subscribe(chartData => {
      const dataPoints = Object.entries(chartData).map(([label, value]) => ({
        label,
        y: value
      }));
  
      
      (this.chartOptions as any) = {
        animationEnabled: true,
        animationDuration: 1000, // Optional: 1 second animation
        title: { text: "" },
        backgroundColor: '#0b1727',
        width: 1000,
        theme: "dark2",
        axisY: {
          title: "Amount in M",
          labelFormatter: function (e: any) {
            return Math.round(e.value / 1_000).toLocaleString() + " M";
          }
        },
        toolTip: {
          contentFormatter: function (e: any) {
            const label = e.entries[0].dataPoint.label;
            const valueInMillions = Math.round(e.entries[0].dataPoint.y / 1_000).toLocaleString();
            return `${label}: ${valueInMillions} M `;
          }
        },
        data: [{
          type: "column",
          dataPoints
        }]
      };
    });
  }

  ngOnDestroy(): void {
    this.getChartDataSub$.unsubscribe();
  }
}
