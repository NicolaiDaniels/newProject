import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-ticker',
  templateUrl: './search-ticker.component.html',
  styleUrls: ['./search-ticker.component.css']
})

export class SearchTickerComponent {

  constructor(private route: Router) {}

  useURL:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=HG6C4L9D8JP9MS6W";

  newChart(text:string) {
      this.useURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${text}&apikey=HG6C4L9D8JP9MS6W`;
  }

  navigateToCrypto() {
    this.route.navigate(['crypto-chart']);
  }
}
