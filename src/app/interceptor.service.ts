import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetails } from './model/UserDetails';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
userdetail=new UserDetails();
  constructor(private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    let httpHeaders = new HttpHeaders();
    this.userdetail = JSON.parse(sessionStorage.getItem('userdetail'));
    if(this.userdetail && this.userdetail.password ){
      if(!req.headers.has("Authorization"))
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(this.userdetail.name + ':' + this.userdetail.password));
    }
    let jwt =sessionStorage.getItem("Authorization");
    if(jwt){
      httpHeaders=httpHeaders.append("Authorization",jwt);
    }
    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    console.log(JSON.stringify(httpHeaders));
    const xhr = req.clone({
      headers: httpHeaders 
    
  });
  return next.handle(xhr).pipe(tap(() => { },
  (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
        return;
      }
      this.router.navigate(['login']);
    }
  }));
  }
}
