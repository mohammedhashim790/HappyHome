import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
export interface Department{
  id:number;
  dname:string,
  location:string
}

@Injectable({
  providedIn: 'root'
})
export class ListServicesService {

  private url:string = "https://localhost:44340/Dept/List";
  constructor(private http:HttpClient) { }

  ListDepartments():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':'*',
        'Content-Type':  'application/json',
        'Authorization':  '*'
      })};
    return this.http.get(this.url,httpOptions).pipe();
  }
}
