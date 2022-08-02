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

  /**
   * Lists All Confirmed Users
   * @constructor
   */
  ListUsers(){
    return this.http.get<UserTable>(this.url,this.httpOptions).pipe();
  }

  /**
   * Get User Info By USER ID
   * @param id
   * @constructor
   */
  GetUserById(id:number){
    return this.http.get<UserTable>(this.url,{
      params:{
        id:id
      },
      headers:this.header
    }).pipe();
  }

  /**
   * Update User Details BY ID
   * @param user
   * @constructor
   */
  UpdateUser(user:UserTable){
    return this.http.post<UserTable>(this.url,user,this.httpOptions).pipe()
  }

  /**
   * Create a New User
   * @param user
   * @constructor
   */
  CreateUser(user:UserTable) {
    return this.http.post<UserTable>(this.url + 'AddUser',user,this.httpOptions).pipe();
  }

  /**
   * Authenticates the user and returns a token
   * @param user
   * @constructor
   */
  AuthenticateUser(user:UserTable){
    return this.http.post<UserTable>(this.url + 'authenticate',user,this.httpOptions);
  }
}
