import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url:string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  register(model:any){
    return this.http.post(this.url,model);
  }

}
