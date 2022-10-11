import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SharedDataServiceService } from '../services/shared-data-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private loginService:LoginService,private userdataSharing:SharedDataServiceService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  name:string=""
  surname:string=""
  email:string=""

   getName(){
    return this.name
  }

  /*setName(theName:string){
    this.name=theName;
  }*/
 
  getUsers(){
    this.loginService.getUsers().subscribe({
      next:(data)=>{
        console.log(data)
        this.name=data.name;
        this.surname=data.surname;
        this.email=data.email;

        this.userdataSharing.passData(data.name)
      },
      error:(err)=>{

      }
    })
  }

}
