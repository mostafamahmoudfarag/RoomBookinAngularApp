import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from './model/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  validateUser(user :UserDetails){
    window.sessionStorage.setItem("userdetail",JSON.stringify(user));
    return  this.http.get(environment.restUrl+'/api/basicAuth/validate',{observe:'response'});
  }
}
