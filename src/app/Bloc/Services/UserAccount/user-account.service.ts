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


  /**
   * Url to Environment / Controller Name
   * @private
   */
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

  /**
   * List All User Accounts
   * @constructor
   */
  ListUserAccount():Observable<Array<UserAccountTable>>{
    return this.http.get<Array<UserAccountTable>>(this.url + 'GetAllAcc',this.httpOptions).pipe();
  }

  /**
   * Create A New User Account
   * @param model
   * @constructor
   */
  CreateNewAccount(model:UserAccountTable){
    return this.http.post<UserAccountTable>(this.url + 'CreateACCP',model,this.httpOptions).pipe();
  }


  /**
   * Update Account By Id
   * @param id
   * @param model
   * @constructor
   */
  UpdateAccount(id:number,model:UserAccountTable){
    return this.http.put(this.url + 'UpdateAccount/'+id,model,{
      headers:this.header
    }).pipe();
  }


  /**
   * Fetch Account By AccountNumber
   * @param id
   * @constructor
   */
  GetAccountByAccountId(id:any){
    return this.http.get<UserAccountTable>(this.url + 'GetByAccoutNumber/'+id,{
      headers:this.header
    }).pipe();
  }

  /**
   * Fetch Account by ID
   * @param id
   * @constructor
   */
  GetAccountById(id:number) {
    return this.http.get<UserAccountTable>(this.url + 'Getaccount/'+id,{
      headers:this.header
    }).pipe();
  }

  /**
   * Filter Accounts by Status
   * @param filter
   * @constructor
   */
  ListUserAccountByStatus(filter: string) {
    return this.http.get<Array<UserAccountTable>>(this.url+ 'GetAllAccByStatus/' + filter,this.httpOptions).pipe();
  }
}
