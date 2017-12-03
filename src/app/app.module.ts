import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { SearchTickerComponent } from './search-ticker/search-ticker.component';
import { CryptoChartComponent } from './crypto-chart/crypto-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchTickerRoutingModule } from './search-ticker/search-ticker-routing.module';
import { StockChartComponent } from './stock-chart/stock-chart.component';

import { StockDataService } from './stock-data.service';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SearchTickerComponent,
    CryptoChartComponent,
    StockChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    SearchTickerRoutingModule,
    AppRoutingModule,
  ],
  providers: [StockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
