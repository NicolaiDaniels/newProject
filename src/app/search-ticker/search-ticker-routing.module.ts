import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CryptoChartComponent } from '../crypto-chart/crypto-chart.component';
import { SearchTickerComponent } from '../search-ticker/search-ticker.component';

const searchRoutes: Routes  = [
  {
    path: 'crypto-chart', component: CryptoChartComponent
  },
  {
    path: 'search-ticker', component: SearchTickerComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SearchTickerRoutingModule {}
