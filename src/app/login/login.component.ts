import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  email:string="";
  password:string="";

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken)
  }

  public getToken():string|null{
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){//o restituisce il token oppure null quindi(forse) null è uguale a false altrimenti se il token esiste è true
    return this.getToken();
  }

 

  login(loginForm:NgForm){

    console.log(this.email)
    
    this.loginservice.login(loginForm.value).subscribe({
      next:(response)=> {console.log(response);
      this.setToken(response.token)
      this.router.navigate(['/user'])
      },
      error:(error)=>{
        console.log(error)}
      // complete:()=>console.info('complete')  

    
      })

  }

}
