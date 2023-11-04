import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserDetails} from './model/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService implements CanActivate{

  user=new UserDetails();
  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    this.user=JSON.parse(sessionStorage.getItem("userdetail"));
    if(!this.user){
      this.router.navigate(['login']);
    }
    return this.user?true:false;
  
  }
}
