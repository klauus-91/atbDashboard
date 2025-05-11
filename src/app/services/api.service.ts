import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getZones(): Observable<any[]> {
    const zones = [
      'Grand Tunis',
      'Cap bon',
      'Centre',
      'Sud',
      'Nord'
    ];

    return of(zones);
  }
  getBranch(): Observable<any> {
    const fakeBranches = [
      {
        "braCode": 22841,
        "braIden": 101,
        "braCorpName": "KEBILI"
      },
      {
        "braCode": 22861,
        "braIden": 102,
        "braCorpName": "MEDENINE"
      },
      {
        "braCode": 24041,
        "braIden": 104,
        "braCorpName": "BEN AROUS"
      },
      {
        "braCode": 29641,
        "braIden": 127,
        "braCorpName": "SOUSSE RIADH"
      },
      {
        "braCode": 30041,
        "braIden": 128,
        "braCorpName": "HAMMAM SOUSSE"
      },
    ]
    return of(fakeBranches);
   /* return this.http.get(this.apiUrl + '/api/branches');*/
  }
  getATMs(branchId: number): Observable<any> {
    const fakeATMs = [
      {
        "atmId": 1052080,
        "atmLocation": "ATB AGENCE LAC 2",
        "branch": 40041
      },
      {
        "atmId": 1052900,
        "atmLocation": "ATB AGENCE LAC 2 MS",
        "branch": 40041
      }
    ]

    return of(fakeATMs) ;
  }
  getTotalAmountChargedByYear(year: number): Observable<any> {
    return of(620)
  }

  getYear(): Observable<number[]> {
    const year = [2023, 2024, 2025]
    return of(year);
  }
}
