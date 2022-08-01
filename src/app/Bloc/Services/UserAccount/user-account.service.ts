import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private url:string = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept':'*',
      'Content-Type':  'application/json',
      'Authorization':  '*'
    })};
  private header = new HttpHeaders({
    'Accept':'*',
    'Content-Type':  'application/json',
    'Authorization':  '*'
  });

  constructor(private http:HttpClient) { }

  ListUserAccount(){
    return this.http.get(this.url,this.httpOptions);
  }

  CreateNewAccount(model:any){
    return this.http.post(this.url,model,this.httpOptions);
  }

  GetAccountById(id:any){
    return this.http.get(this.url,{
      params:{
        id:id
      },
      headers:this.header
    });
  }
}
