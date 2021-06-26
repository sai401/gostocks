import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockListComponent } from './dashboard/list/stock-list/stock-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_drilldown from 'highcharts/modules/drilldown';
import { DashboardService } from './dashboard/dashboard.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ColumnWithNegativeValuesComponent } from './dashboard/charts/column-with-negative-values/column-with-negative-values.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


HC_drilldown(Highcharts);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StockListComponent,
    ColumnWithNegativeValuesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HighchartsChartModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
