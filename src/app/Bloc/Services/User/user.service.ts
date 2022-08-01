import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  ListUsers(){
    return this.http.get(this.url,this.httpOptions);
  }

  GetUserById(id:number){
    return this.http.get(this.url,{
      params:{
        id:id
      },
      headers:this.header
    })
  }
  
  UpdateUser(user:any){
    return this.http.post(this.url,user,this.httpOptions)
  }

}
