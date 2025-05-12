import { Component } from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FilterComponent} from '../filter/filter.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';

@Component({
  selector: 'app-main-dashboard',
  imports: [
    ReactiveFormsModule,
    FilterComponent,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {

  peiChartOptions = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    exportEnabled: true,
    data: [{
      type: "pie", //change type to column, line, area, doughnut, etc
      indexLabel: "{name}: {y}%",
      indexLabelFontColor: "white",
      dataPoints: [
        { name: "Grand Tunis", y: 43.51 },
        { name: "Sud", y: 23.66 },
        { name: "Nord", y: 19.08 },
        { name: "Center", y: 13.74 },
        { name: "Cap Bon", y: 20.1 }
      ]
    }]
  }

  multiSeriesChartOptions = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    axisX: {
      labelAngle: -90,
      labelFontColor: "white"
    },
    axisY: {
      title: "Nb Branch/ Nb GAB",
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
      name: "Nomber Branchs",
      legendText: "Nomber Branchs",
      showInLegend: true,
      indexLabelFontColor: "white",
      dataPoints:[
        {label: "Grand Tunis", y: 56},
        {label: "Sud", y: 42},
        {label: "Nord", y: 29},
        {label: "Center", y: 23},
        {label: "Cap Bon", y: 11},
      ]
    }, {
      type: "column",
      name: "Nomber GAB",
      legendText: "Nomber GAB",

      showInLegend: true,
      indexLabelFontColor: "white",
      dataPoints:[
        {label: "Grand Tunis", y: 82},
        {label: "Sud", y: 47},
        {label: "Nord", y: 29},
        {label: "Center", y: 23},
        {label: "Cap Bon", y: 11},
      ]
    }]
  }
}
