import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Users } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private theUsers: Users[] = []

  private isAddedNewSubject: BehaviorSubject<boolean>
  isAddedNew$: Observable<boolean>
  theUsers$: Observable<Array<Users>>


  constructor() {
    this.isAddedNewSubject = new BehaviorSubject<boolean>(false)
    this.isAddedNew$ = this.isAddedNewSubject.asObservable()

    this.getUsers();
    this.theUsers$ = of(this.theUsers)
  }


  getUsers() {
    console.log("GetUsers")
    const localUsers = localStorage.getItem("users")

    if (localUsers) {
      this.theUsers = JSON.parse(localUsers);
    } else {
      this.theUsers.push(new Users('Giovanni', 'Balsamo'))
      this.theUsers.push(new Users('Maria', 'Dibattista'))
      this.theUsers.push(new Users('Marta', 'Distefano'))
      this.theUsers.push(new Users('Alessio', 'Ventura'))
      this.theUsers.push(new Users('Luca', 'Salerno'))
    }
  }

  saveLocalUsers(users: Users[]) {
    const jsonString = JSON.stringify(users);
    localStorage.setItem("users", jsonString)
  }

  setAddNew() {
    this.isAddedNewSubject.next(true)
  }

  setList() {
    this.isAddedNewSubject.next(false)
  }

  save(user: Users) {
    this.theUsers.push(user)
    this.theUsers$ = of(this.theUsers)
    this.isAddedNewSubject.next(false)
    this.saveLocalUsers(this.theUsers);
  }

}
