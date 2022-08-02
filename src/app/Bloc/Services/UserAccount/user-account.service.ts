import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserAccountTable, UserTable} from "../../Interfaces/Interfaces";
import {Observable} from "rxjs";

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

  ListUserAccount():Observable<Array<UserAccountTable>>{
    return this.http.get<Array<UserAccountTable>>(this.url + 'GetAllAcc',this.httpOptions).pipe();
  }

  CreateNewAccount(model:UserAccountTable){
    return this.http.post<UserAccountTable>(this.url + 'CreateACCP',model,this.httpOptions).pipe();
  }


  UpdateAccount(id:number,model:UserAccountTable){
    return this.http.put(this.url + 'UpdateAccount/'+id,model,{
      headers:this.header
    }).pipe();
  }

  GetAccountByAccountId(id:any){
    return this.http.get<UserAccountTable>(this.url + 'GetByAccoutNumber/'+id,{
      headers:this.header
    }).pipe();
  }

  GetAccountById(id:number) {
    return this.http.get<UserAccountTable>(this.url + 'Getaccount/'+id,{
      headers:this.header
    }).pipe();
  }

  ListUserAccountByStatus(filter: string) {
    return this.http.get<Array<UserAccountTable>>(this.url+ 'GetAllAccByStatus/' + filter,this.httpOptions).pipe();
  }
}
