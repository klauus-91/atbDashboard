import { Component } from '@angular/core';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-prediction',
  imports: [
    CanvasJSAngularChartsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss'
})
export class PredictionComponent {

  displayPage: boolean = false;
  chartOptions = {
    title: {
      text: "Total amount charged (last 5 months) "
    },
    animationEnabled: true,
    axisY: {
      includeZero: true
    },
    theme: "dark2",
    backgroundColor: '#0b1727',
    data: [{
      color: "#2c7be5",
      type: "column",

      indexLabel: "{y}", // shows y-value on top
      indexLabelFontColor: "#5A5757",
      dataPoints: [
        { label: "December", y: 6000 },
        { label: "January", y: 5500 },
        { label: "February", y: 5000 },
        { label: "March", y: 6500 },
        { label: "April", y: 7100 },

      ]
    }]
  }
  atmID: number = 1005680;

  searchATM() {
    console.log(this.atmID);
    this.displayPage = true;
  }
}
