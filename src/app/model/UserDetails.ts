 export class UserDetails{
 public name:string|undefined;
public password:string|undefined;
constructor(username?:string,userpassword?:string){
    this.name=username;
    this.password=userpassword;
}



}