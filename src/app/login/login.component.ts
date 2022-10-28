import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //model-driven approach (no template-driven approach)
  logForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.minLength(5)]),
    password:new FormControl("",[Validators.required,Validators.minLength(4)])
  })

  isAuthenticationFailed$:Observable<boolean>

  

  constructor(private loginservice:LoginService,private router:Router) {
    this.isAuthenticationFailed$=this.loginservice.invalidCredentialObservable$;
   }

  ngOnInit(): void {
  }

  
  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken)
  }

  public getToken():string|null{
    return localStorage.getItem("jwtToken");
  }

 

  public isLoggedIn(){//o restituisce il token oppure null quindi(forse) null è uguale a false altrimenti se il token esiste è true
    return this.getToken();
  }


  login(){

    console.log(this.logForm.value)

    this.loginservice.login(this.logForm.value)
    
    
  }


}
