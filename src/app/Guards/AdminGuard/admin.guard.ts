import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserParams} from "../../Bloc/UserParams";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router:Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!(UserParams.UserParams!=undefined && UserParams.UserParams.is_Admin == true)){
      this.router.navigateByUrl('');
    }

    return UserParams.UserParams!=undefined && UserParams.UserParams.is_Admin == true;
  }

}
