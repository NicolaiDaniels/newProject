import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CryptoChartComponent } from './crypto-chart/crypto-chart.component';
import { SearchTickerComponent } from './search-ticker/search-ticker.component';

const appRoutes: Routes  = [
  {
    path: '', redirectTo: '/search-ticker', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
