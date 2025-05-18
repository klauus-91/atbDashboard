import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getZones(): Observable<any[]> {
    const zones = [
      'Grand Tunis',
      'Cap Bon',
      'Centre',
      'Sud',
      'Nord'
    ];

    return of(zones);
  }
  getBranch(zone: string): Observable<any> {
    return this.http.get(this.apiUrl + '/zone_branch/?zone=' + zone);
  
  }
  getATMs(branchId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/atms/?braCode=' + branchId);

  }
  getTotalAmountChargedByYear(year: number): Observable<any> {
    return of(620)
  }

  getYear(): Observable<any> {
    return this.http.get<{ years: number[] }>(this.apiUrl + '/year/').pipe(
      map(response => response.years)
    );

  }

  getGeneralViewPieChartData(x: string, y: string): Observable<any> {
    return this.http.get(this.apiUrl + '/generalchartfilter/?x=' + x + '&y=' + y);
  }

  getNumberOfBranchs(zone: string): Observable<any> {
    return this.http.get<{ numberOfBranches: number }>(this.apiUrl + '/numberOfBranches/?zone=' + zone).pipe(
      map(response => response.numberOfBranches)
    );
  
  }
  getNumberOfATMs(zone: string): Observable<any> {
    return this.http.get<{ numberOfATMs: number }>(this.apiUrl + '/numberOfATMs/?zone=' + zone).pipe(
      map(response => response.numberOfATMs)
    );
  
  }
}
