import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Users } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private theUsers:Array<Users>

  private isAddedNewSubject:BehaviorSubject<boolean>
  isAddedNew$:Observable<boolean>
  theUsers$:Observable<Array<Users>>


  constructor() {
    this.isAddedNewSubject=new BehaviorSubject<boolean>(false)
    this.isAddedNew$=this.isAddedNewSubject.asObservable()

    this.theUsers= new Array<Users>();
    this.theUsers.push(new Users('Giovanni','Balsamo'))
    this.theUsers.push(new Users('Maria', 'Dibattista'))
    this.theUsers.push(new Users('Marta', 'Distefano'))
    this.theUsers.push(new Users('Alessio', 'Ventura'))
    this.theUsers.push(new Users('Luca', 'Salerno'))

    this.theUsers$=of(this.theUsers)
  }

  setAddNew(){
    this.isAddedNewSubject.next(true)
  }

  setList(){
    this.isAddedNewSubject.next(false)
  }

  save(user:Users){
    this.theUsers.push(user)
    this.theUsers$=of(this.theUsers)
    this.isAddedNewSubject.next(false)
  }

}
