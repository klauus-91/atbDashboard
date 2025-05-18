import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterComponent} from '../filter/filter.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { PrettyLabelPipe } from '../pipes/pretty-label.pipe';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CanvasJSAngularChartsModule,
    FormsModule,
    CommonModule,
    PrettyLabelPipe
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent implements OnInit {

  @ViewChild('pieChart', { static: false }) pieChartComponent: any;
  pieChartSelectedOption: string = 'agencyPerZone';
  x: string = 'zone';
  y: string = 'numberOfBranches';
  pieChartData$!: Observable<any[]>;
  pieChartZonePerBranch: any;
  pieChartZonePerATM: any;
  showPieChart1 = true;
  showPieChart2 = false;

  numberOfBranches$!: Observable<any>;
  numberOfATMs$!: Observable<any>;

  multiSeriesChartOptions: any;
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
  
   }
  ngOnInit() {
   this.initiateChart1(); 
   this.initiateChart2();
   this.numberOfBranches$ = this.apiService.getNumberOfBranchs('');
   this.numberOfATMs$ = this.apiService.getNumberOfATMs('');
   this.multiSeriesChartData();
   
  }
  ngAfterViewInit() {
    setTimeout(() => { this.updatePieChart()},0);
  
  }
  initiateChart1() {
    let dataPoints = [];
    this.apiService.getGeneralViewPieChartData('zone', 'numberOfBranches').subscribe((data) => {
      const keys = Object.keys(data);
      const values = Object.values(data) as number[];
  
      for (let i = 0; i < keys.length; i++) {
        dataPoints.push({ name: keys[i], y: values[i] });
      }
      this.pieChartZonePerBranch = {
        animationEnabled: true,
        backgroundColor: 'transparent',
        exportEnabled: true,
        data: [{
          type: "pie",
          indexLabel: "{name}: {y}",
          indexLabelFontColor: "white",
          dataPoints: dataPoints
        }]
      };
    });
  }
  initiateChart2() {
    let dataPoints = [];
    this.apiService.getGeneralViewPieChartData('zone', 'numberOfATMs').subscribe((data) => {
      const keys = Object.keys(data);
      const values = Object.values(data) as number[];
  
      for (let i = 0; i < keys.length; i++) {
        dataPoints.push({ name: keys[i], y: values[i] });
      }
      this.pieChartZonePerATM = {
        animationEnabled: true,
        backgroundColor: 'transparent',
        exportEnabled: true,
        data: [{
          type: "pie",
          indexLabel: "{name}: {y}",
          indexLabelFontColor: "white",
          dataPoints: dataPoints
        }]
      };
    });
  }
  updatePieChart() {

  let dataPoints = [];

  if (this.y == 'numberOfBranches') {
    this.showPieChart1 = true;
    this.showPieChart2 = false;
    this.apiService.getGeneralViewPieChartData(this.x, this.y).subscribe((data) => {
      const keys = Object.keys(data);
      const values = Object.values(data) as number[];
  
      for (let i = 0; i < keys.length; i++) {
        dataPoints.push({ name: keys[i], y: values[i] });
      }
      this.pieChartZonePerBranch = {
        animationEnabled: true,
        backgroundColor: 'transparent',
        exportEnabled: true,
        data: [{
          type: "pie",
          indexLabel: "{name}: {y}",
          indexLabelFontColor: "white",
          dataPoints: dataPoints
        }]
      };
    });
  }
  if (this.y == 'numberOfATMs') {
    this.showPieChart1 = false;
    this.showPieChart2 = true;

    this.apiService.getGeneralViewPieChartData(this.x, this.y).subscribe((data) => {
      const keys = Object.keys(data);
      const values = Object.values(data) as number[];
  
      for (let i = 0; i < keys.length; i++) {
        dataPoints.push({ name: keys[i], y: values[i] });
      }
  
      this.pieChartZonePerATM = {
        animationEnabled: true,
        backgroundColor: 'transparent',
        exportEnabled: true,
        data: [{
          type: "pie",
          indexLabel: "{name}: {y}",
          indexLabelFontColor: "white",
          dataPoints: dataPoints
        }]
      };

    });
  }

  }
  selectPieChartOption() {
    console.log(this.pieChartSelectedOption);
    if (this.pieChartSelectedOption == 'agencyPerZone') {
      this.x = 'zone';
      this.y = 'numberOfBranches';
    }
    if (this.pieChartSelectedOption == 'atmPerZone') {
      this.x = 'zone';
      this.y = 'numberOfATMs';
    }
     
    setTimeout(() => { this.updatePieChart()},0);

  }

  multiSeriesChartData() {
    let data1: any = [];
    let data2: any = [];
    let zones = ['Grand Tunis', 'Cap Bon', 'Centre', 'Sud', 'Nord'];
    zones.forEach((zone) => {
      let serie1 = this.apiService.getNumberOfBranchs(zone);
      let serie2 = this.apiService.getNumberOfATMs(zone);
      serie1.subscribe((data) => {
        data1.push({ label: zone, y: data });
      });
      serie2.subscribe((data) => {
        data2.push({ label: zone, y: data });
      });

    })
    console.log(data1);
    console.log(data2);
    
    this.multiSeriesChartOptions = {
      animationEnabled: true,
      backgroundColor: 'transparent',
      axisX: {
        labelAngle: -90,
        labelFontColor: "white"
      },
      axisY: {
        title: "Nb Branch/ Nb ATM",
        titleFontColor: "white",      // ✅ Set axis title color
        labelFontColor: "white"       // Optional: make axis tick labels white too
      },
      toolTip: {
        shared: true
      },
      legend:{
        cursor:"pointer",
        itemclick: function(e: any){
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "column",
        name: "Branch Number",
        legendText: "Branch Number",
        showInLegend: true,
        indexLabelFontColor: "white",
        dataPoints:data1
      }, {
        type: "column",
        name: "ATM Number",
        legendText: "ATM Number",
  
        showInLegend: true,
        indexLabelFontColor: "white",
        dataPoints:data2
      }]
    }

  }
}
