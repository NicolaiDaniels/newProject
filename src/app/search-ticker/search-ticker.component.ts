import { Component} from '@angular/core';

@Component({
  selector: 'search-ticker',
  templateUrl: './search-ticker.component.html',
  styleUrls: ['./search-ticker.component.css']
})

export class SearchTickerComponent {

  useURL:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=HG6C4L9D8JP9MS6W";

  newChart(text:string) {
      this.useURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${text}&apikey=HG6C4L9D8JP9MS6W`;
  }
}
