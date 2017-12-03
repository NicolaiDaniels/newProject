import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockDataService } from '../stock-data.service';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.css']
})
export class CryptoChartComponent implements OnInit{

  coinName: string = "Bitcoin";
  useUrl: string = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=HG6C4L9D8JP9MS6W';

  cryptoChartData:any;

  lineChartLabels:Array<any> = [];

  //ng2-chart properties
  constructor(private route: Router, private stockDataService: StockDataService) { }

  ngOnInit() {
    this.dataSubscribe();
  }

  navigateToChart() {
    this.route.navigate(['search-ticker']);
  }

  newCoin(event: any) {
    //set header of page
    this.coinName = event.target.innerHTML;
    //set temporary coinTicker for API call
    let coinTicker = event.target.value;
    //set URL with corresponding ticker
    this.useUrl = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${coinTicker}&market=USD&apikey=HG6C4L9D8JP9MS6W`;
    //subscribe to API to receive crypto data
    this.dataSubscribe();
  }

  dataSubscribe() {
    this.stockDataService.getData(this.useUrl).subscribe(
      data => {
        if(data['Error Message']){
          console.log("Service not available");
        }
        //avoid a bug
        this.cryptoChartData = data['Time Series (Digital Currency Daily)'];
        this.lineChartLabels = Object.keys(this.cryptoChartData).reverse();
        console.log("Value received: ", data);
      },
      err => {
        console.log("Error: ", err);
      },
      () => {
        console.log("Completed");
      }
    );
  }
}
