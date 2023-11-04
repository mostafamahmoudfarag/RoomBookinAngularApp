import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../model/UserDetails';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userdetail=new UserDetails();
message='';

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("User Deatils is "+ this.userdetail.name+" "+this.userdetail.password);
    this.loginService.validateUser(this.userdetail).subscribe(
      responseData => {
        window.sessionStorage.setItem("Authorization",responseData.headers.get("Authorization"))
        this.userdetail = <any> responseData.body;
        window.sessionStorage.setItem("userdetail",JSON.stringify(this.userdetail));
        console.log('navigatie to booking calender')
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
  }
}
