import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserTable} from "../../Interfaces/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  private controllerName:string = "User/"
  private url:string = environment.apiUrl + this.controllerName;

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

  ListUsers(){
    return this.http.get<UserTable>(this.url,this.httpOptions).pipe();
  }

  GetUserById(id:number){
    return this.http.get<UserTable>(this.url,{
      params:{
        id:id
      },
      headers:this.header
    }).pipe();
  }

  UpdateUser(user:UserTable){
    return this.http.post<UserTable>(this.url,user,this.httpOptions).pipe()
  }

  CreateUser(user:UserTable) {
    return this.http.post<UserTable>(this.url + 'AddUser',user,this.httpOptions).pipe();
  }

  AuthenticateUser(user:UserTable){
    return this.http.post<UserTable>(this.url + 'authenticate',user,this.httpOptions);
  }
}
