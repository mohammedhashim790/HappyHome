import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserAccountTable, UserTable} from "../../Interfaces/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private controllerName:string = "loan/"


  private url:string = environment.apiUrl + this.controllerName;
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept':'*',
      'Content-Type':  'application/json',
      'Authorization':  '*',
    })};
  private header = new HttpHeaders({
    'Accept':'*',
    'Content-Type':  'application/json',
    'Authorization':  '*',
  });

  constructor(private http:HttpClient) { }

  ListUserAccount(){
    return this.http.get<UserAccountTable>(this.url + 'GetAllAcc',this.httpOptions).pipe();
  }

  CreateNewAccount(model:UserTable){
    return this.http.post<UserTable>(this.url + 'CreateACCP',model,this.httpOptions).pipe();
  }


  UpdateAccount(id:number,model:UserTable){
    return this.http.post(this.url,model,{
      params:{
        id:id
      },
      headers:this.header
    }).pipe();
  }

  GetAccountById(id:any){
    return this.http.get<UserTable>(this.url,{
      params:{
        id:id
      },
      headers:this.header
    }).pipe();
  }
}
