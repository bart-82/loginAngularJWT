import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SharedDataServiceService } from '../services/shared-data-service.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName:string="";

  constructor(
    private login:LoginComponent,
    private router:Router,
    private user:UserComponent,
    private userDataservice:SharedDataServiceService
    ) { }

  ngOnInit(): void {

    this.userDataservice.cast.subscribe(user=> this.userName=user)

  }

  

  public isLoggedIn(){
   
    return this.login.isLoggedIn();
  }

  public logout(){
    console.log(this.login.isLoggedIn())
    this.login.clear();
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
