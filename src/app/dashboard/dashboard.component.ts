import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DashboardService } from './dashboard.service';
import { ColumnChart } from './models/column-chart.model';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isChartLoading = true;
  chartList: Array<any> = [];
  companyNames: Array<string> = [];

  selectedValue = 'Nahar Poly';
  sectorName = "Banks";
  sectorNames: string[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getSectorList().subscribe(res => {
      this.getSectorsListFromExcel(res);
    });
  }

  getSectorsListFromExcel(obj: any) {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(obj);

    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const workSheet1: XLSX.WorkSheet = wb.Sheets['Sheet1'];
      const sheetData: any[] = XLSX.utils.sheet_to_json(workSheet1);
      debugger
      this.sectorNames = sheetData.map(res => res["Names"]);
      this.onSectorSelectionChange('Banks')
    };
  }

  onSectorSelectionChange(value: string) {
    this.chartList = [];
    this.selectedValue = 'Nahar Poly';
    this.dashboardService.getCompanyNames(value).subscribe((res) => {
      this.getCompanyNamesFromExcel(res);
    });
  }

  getCompanyNamesFromExcel(obj: any) {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(obj);

    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const workSheet1: XLSX.WorkSheet = wb.Sheets['Sheet'];
      const sheetData: any[] = XLSX.utils.sheet_to_json(workSheet1);
      this.companyNames = sheetData.map(res => res["Polyplex Corpn"]);
      this.onCompanySelectionChange(this.selectedValue);
    };
  }

  onCompanySelectionChange(value: string) {
    this.chartList = [];
    this.isChartLoading = true;
    this.dashboardService.getCompanyData(this.sectorName, value).subscribe((res) => {
      this.getChartByCompanyName(res);
    });
  }

  getChartByCompanyName(res: any) {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(res);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      wb.SheetNames.forEach((e, i) => {
        const workSheet1: XLSX.WorkSheet = wb.Sheets[e];
        const sheetData = XLSX.utils.sheet_to_json(workSheet1);
        this.getChartData(sheetData, e, i);
      });
    };
  }

  getChartData(excelData: any[], chartTitle: string, index: number) {
    let filteredList;
    if (index === 0) {
      filteredList = excelData.filter(
        (obj) =>
          obj['__EMPTY'] === 'Net Profit' || obj['__EMPTY'] === 'EPS in Rs'
      );
    } else if (index === 1) {
      filteredList = excelData.filter(
        (obj) =>
          obj['__EMPTY'] === 'Reserves' ||
          obj['__EMPTY'] === 'Total Liabilities'
      );
    } else {
      filteredList = excelData.filter(
        (obj) => obj['__EMPTY'] === 'Net Cash Flow' || obj[''] === 'Net Cash Flow'
      );
    }

    const categoryList: Array<string> = this.getCategories(filteredList[0]);
    const seriesList: ColumnChart[] = this.getSeriesData(filteredList);
    this.chartList.push({
      categoryList,
      seriesList,
      chartTitle,
    });
    if (index > 1) this.isChartLoading = false;
  }

  private getSeriesData(listData: any[]) {
    let seriesList: ColumnChart[] = [];
    for (var obj of listData) {
      const name = obj['__EMPTY'];
      delete obj['__EMPTY'];
      const data = Object.values(obj).map((res) => Number(res));
      seriesList.push({
        name,
        data,
      });
    }
    return seriesList;
  }

  private getCategories(listData: any[]) {
    return Object.keys(listData).filter((obj) => obj !== '__EMPTY');
  }
}
