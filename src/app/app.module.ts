import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { SearchTickerComponent } from './search-ticker/search-ticker.component';

import { StockDataService } from './stock-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SearchTickerComponent
  ],
  imports: [
    BrowserModule, HttpModule, ChartsModule
  ],
  providers: [StockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
