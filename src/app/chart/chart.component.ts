import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StockDataService } from '../stock-data.service';
import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

//Reusable chart component, used by stock-chart and crypto-chart
@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
})
export class ChartComponent implements OnChanges {
    @Input() dataObject:any;
    @Input() chartType:string;

    //ng2-chart properties initiated
    public barChartData:any;
    public barChartLabels:Array<any> = [];

    public lineChartData:any;
    public lineChartLabels:Array<any> = [];

    //chart option object to make a mixed chart possible
    public lineChartOptions:any = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
              display: false
          }
        }],
        yAxes: [{
          /*ticks: {
            callback: function(value, index, values) {
                return '$' + value;
            }
          },*/
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1"
        }, {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines:{
              display: false
          }
        }]
      }
    };

    public datasets:Array<any> =[{
        label: 'volume',
        data: this.barChartData,
        fill: 'false',
        yAxisID: 'y-axis-2'
        }, {
        label: 'price ($)',
        data: this.lineChartData,
        type: 'line',
        fill: 'false',
        yAxisID: 'y-axis-1'
      }];

    constructor(){}

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
      console.log(this.dataObject);
          //clear the chart data before setting new
          this.clearData();
          //Set the chart attributes with the received API-Data
          this.lineChartLabels = Object.keys(this.dataObject).reverse();

          //loop through the object with the keys (x-axis) to receive the corresponding price and volume data (y-axis)
          if(this.chartType == 'stock') {
            for (let c of this.lineChartLabels) {
              let d = this.dataObject[c]['4. close'];
              let e = this.dataObject[c]['5. volume'];
              this.lineChartData.push(parseFloat(d));
              this.barChartData.push(parseInt(e));
            }
          }
          else {
            for (let c of this.lineChartLabels) {
              let d = this.dataObject[c]['4a. close (USD)'];
              let e = this.dataObject[c]['5. volume'];
              this.lineChartData.push(parseFloat(d));
              this.barChartData.push(parseInt(e));
            }
            //API doesnt allow to scale the amount of  crypto data. Setting manually to a smaller amount of data
            let arr_length = Math.ceil(this.lineChartData.length / 1.3);
            this.lineChartLabels = this.lineChartLabels.splice(arr_length,this.lineChartData.length);
            this.lineChartData = this.lineChartData.splice(arr_length,this.lineChartData.length);
            this.barChartData = this.barChartData.splice(arr_length,this.lineChartData.length);
          }

          //set the dataset for the mixed bar and line chart
          this.datasets[0].data = this.barChartData;
          this.datasets[1].data = this.lineChartData;

    }

    //function to clear all chart data
    clearData() {
      this.barChartData = [];
      this.lineChartData = [];
      this.lineChartLabels = [];
    }
}
