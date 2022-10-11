import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {

  private userData=new BehaviorSubject<string>('')
  cast=this.userData.asObservable();

  constructor() { }

  passData(val:any){
    this.userData.next(val)
    console.log(val)
  }

}
