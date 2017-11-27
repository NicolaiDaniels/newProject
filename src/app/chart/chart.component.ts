import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StockDataService } from '../stock-data.service';
import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    providers: [ StockDataService ]
})
export class ChartComponent implements OnChanges {
    @Input() url:string;
    @Input() heading:string;

    chartServiceData:any;

    //boolean to toggle between chart and not found div
    display:boolean = true;

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
        label: 'price',
        data: this.lineChartData,
        type: 'line',
        fill: 'false',
        yAxisID: 'y-axis-1'

      }];

    constructor(private stockDataService: StockDataService){
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        //subscribe to API to receive stock data
        this.stockDataService.getData(this.url).subscribe(

        data => {
          if(data['Error Message']){
            this.display = false;
            return this.heading = "No such Ticker";
          }

          this.display = true;
          //clear the chart data before setting new
          this.clearData();
          console.log("VALUE RECEIVED: ", data);

          //Set the chart attributes with the received API-Data
          this.chartServiceData = data['Time Series (Daily)'];
          this.lineChartLabels = Object.keys(this.chartServiceData).reverse();

          //loop through the object with the keys (x-axis) to receive the corresponding price and volume data (y-axis)
          for (let c of this.lineChartLabels) {
            let d = this.chartServiceData[c]['4. close'];
            let e = this.chartServiceData[c]['5. volume'];
            this.lineChartData.push(parseFloat(d));
            this.barChartData.push(parseInt(e));
          }

          //set the dataset for the mixed bar and line chart
          this.datasets[0].data = this.barChartData;
          this.datasets[1].data = this.lineChartData;

        },
        err => {
          console.log("ERROR: ", err);
        },
        () => {
          console.log("Completed");
        }
      );
    }

    //function to clear all chart data
    clearData() {
      this.barChartData = [];
      this.chartServiceData = [];
      this.lineChartData = [];
      this.lineChartLabels = [];
    }
}
