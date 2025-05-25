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
  getTotalAmountCharged(inputs: any): Observable<any> {
    const { year, month, zone, branchId, atmId  } = inputs;
    
    const monthParam = month && month !== '00' ? month : ''; // Ensure month is '00' if not provided
    const yearParam = year && year !== 0 ? year : '';
    const branchParam = branchId && branchId !== 0 ? branchId : '';
    const atmParam = atmId && atmId !== 0 ? atmId : '';
    const zoneParam = zone && zone !== '' ? zone : '';
    console.log( '/totalAmounts/?year=' + yearParam + '&month=' + monthParam + '&zone=' + zoneParam + '&branch=' + branchParam + '&atm=' + atmParam);
    return this.http.get(this.apiUrl + '/totalAmounts/?year=' + yearParam + '&month=' + monthParam + '&zone=' + zoneParam + '&branch=' + branchParam + '&atm=' + atmParam);
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
  getLiquidityChartData(inputs: any): Observable<any> {
    const { year, month, chartType } = inputs;
  
    const yearParam = year && year !== 0 ? year : '';

    return this.http.get(this.apiUrl + '/barchartfilter/?year=' + yearParam + '&month=' + month + '&x=zone' + '&y=' + chartType);
  }

  topAgencies(inputs: any): Observable<any> {
    const {year, month, value} = inputs;
    const monthParam = month && month !== '00' ? month : ''; 
    const yearParam = year && year !== 0 ? year : '';
   
    return this.http.get(this.apiUrl + '/top5Agencies/?year=' + yearParam + '&month=' + monthParam + '&value=' + value);

  }
}
