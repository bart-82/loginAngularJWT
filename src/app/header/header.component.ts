import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';
import { SharedDataServiceService } from '../services/shared-data-service.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName:string="";
  userName$!:Observable<string>;

  constructor(
    private loginService:LoginService,
    private login:LoginComponent,
    private router:Router,
    private user:UserComponent,
    private userDataservice:SharedDataServiceService
    ) {
      this.loginService.getUserLogged()//funziona solo se faccio refresh della pagina perchè prima non ho il token leea local storage
      // this.userName$=loginService.userLogged$
      // console.log(this.userName$)
     }

    

  ngOnInit(): void {

    this.userDataservice.cast.subscribe(user=> this.userName=user)
    

  }

  getUser(){
    this.userName$=this.loginService.userLogged$
    return this.userName$
  }
  

  

  public isLoggedIn(){
   
    return this.login.isLoggedIn();
  }

  public logout(){
    console.log(this.login.isLoggedIn())
    this.loginService.logout();
    this.router.navigate(['']);
  }

  list=[
    {
      number:'1',
      name:'Home',
      link:''
      
    },
    {
      number:'2',
      name:'List',
      link:'/list'
      
    },
    {
      number:'3',
      name:'Analitics',
      link:'/analitics'
      
    },
  ]



}
