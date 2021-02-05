import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookTicketService {

  constructor(private http: HttpClient){}

  public get(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
    '/get/seats', {headers: null}
    );
  }
}
