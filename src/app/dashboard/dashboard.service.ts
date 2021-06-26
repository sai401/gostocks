import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getSectorList(): Observable<any> {
    return this.http.get(`/assets/sectorList.xlsx`, { responseType: 'blob' });
  }

  getCompanyNames(sectorName: string): Observable<any> {
    return this.http.get(`/assets/${sectorName}/Packaging.xlsx`, { responseType: 'blob' });
  }

  getCompanyData(sectorName: string, fileName: string): Observable<any> {
    return this.http.get(`/assets/${sectorName}/${fileName}/${fileName}.xlsx`, { responseType: 'blob' });
  }

}
