import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StockDataService } from '../stock-data.service';
import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnChanges {
    @Input() url:string;
    @Input() heading:string;

    chartServiceData:any;

    //boolean to toggle between chart and not found div
    display:boolean = true;
    stockChartData:any;

    lineChartLabels:Array<any> = [];

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
          this.stockChartData = data;
          //avoid a bug
          this.chartServiceData = data['Time Series (Daily)'];
          this.lineChartLabels = Object.keys(this.chartServiceData).reverse();
          //clear the chart data before setting new
          console.log("VALUE RECEIVED: ", data);

        },
        err => {
          console.log("ERROR: ", err);
        },
        () => {
          console.log("Completed");
        }
      );
    }

}
