import { Component, OnInit, ViewChild } from '@angular/core';
import { from, Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

import { UsersService } from '../services/users.service';
import jwt_decode from 'jwt-decode'
import { Users } from '../Models/users';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  IsAddNew$: Observable<boolean>;
  Customers$: Observable<Array<Users>>;
  FirstName:string="";
  LastName:string="";
  @ViewChild('myForm')CustomerForm!: NgForm;
  LoginUserFirstName:string="DummyFName";

  constructor(private usersService:UsersService, private loginService:LoginService) {
    // const decodedToken=jwt_Decode<any>(localStorage['jwtToken'])
    // this.LoginUserFirstName=decodedToken.FirstName;
    
    

    this.IsAddNew$=this.usersService.isAddedNew$;
    this.Customers$=this.usersService.theUsers$;
    
   }



  ngOnInit(): void {
    
  }

  AddNew() {
    this.usersService.setAddNew();
  }
  Reset() {
    this.CustomerForm.reset();
  }
  Save() {
    this.usersService.save(new Users(this.FirstName, this.LastName));
    this.Reset();
  }
  Cancel() {
    this.usersService.setList();
    this.Reset();
  }
  logout() {
    this.loginService.logout();
  }


}

