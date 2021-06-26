import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';

@Component({
  selector: 'app-column-with-negative-values',
  templateUrl: './column-with-negative-values.component.html',
  styleUrls: ['./column-with-negative-values.component.scss'],
})
export class ColumnWithNegativeValuesComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() data: any;
  isChartLoading = true;
  updateFlag = false;
  chartOptions: Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: [],
    },
    credits: {
      enabled: false,
    },
    series: [],
  };

  ngOnChanges(change: SimpleChanges) {
    this.chartOptions.xAxis = {
      categories: this.data.categoryList,
    };
    this.chartOptions.title = {
      text: this.data.chartTitle,
    };
    this.chartOptions.series = this.data.seriesList;
    this.updateFlag = true;
    this.isChartLoading = false;
  }
  constructor() {}

  ngOnInit(): void {}
}
