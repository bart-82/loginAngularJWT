import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse } from '../Models/HttpResponse/authenticationResponse';
import { User } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticationFailedSubject:Subject<boolean>;

  invalidCredentialObservable$:Observable<boolean>

  userLogged$!: Observable<string>;

  constructor(private http:HttpClient, private router:Router){
    this.isAuthenticationFailedSubject=new Subject();
    this.invalidCredentialObservable$=this.isAuthenticationFailedSubject.asObservable()
  }

    
  

  wsLogin:string=environment.baseUrl+'login';
  // wsUsers:string='https://jsonplaceholder.typicode.com/users'
  wsUsers:string=environment.baseUrl+'users/logged';


  login(user:User):void{
     this.http.post<AuthenticationResponse>(this.wsLogin,user)
     .subscribe(
      (response)=>{
        if(response.token!==undefined){
          localStorage.setItem('jwtToken',response.token)
          this.router.navigate(['/user'])
        }else{
          this.isAuthenticationFailedSubject.next(true)
        }
      })
     
  }

  getUserLogged(){
    this.http.get(this.wsUsers).subscribe(
      (data:any)=>{
        console.log(data)
        this.userLogged$=data.name;
        console.log(this.userLogged$)
      }
    )
  }

  isAuthenticated(){//user is not logged-in(no token)
    const token=localStorage['jwtToken']
    return token!=null||token!=undefined
  }

  isTokenExpired(){//user logged-in but token expired
    const helper=new JwtHelperService()//command to install this library npm install @auth0/angular-jwt --save
    return helper.isTokenExpired(localStorage['jwtToken'])
  }

  public logout(){
    localStorage.clear();
  }

}
