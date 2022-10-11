import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient){}

    requestHeaders= new HttpHeaders({ 'Content-Type': 'application/json' })
  

  wsLogin:string=environment.baseUrl+'login';
  // wsUsers:string='https://jsonplaceholder.typicode.com/users'
  wsUsers:string=environment.baseUrl+'users/logged';


  login(loginData:any):Observable<any>{
    return this.http.post(this.wsLogin,loginData,{headers:this.requestHeaders})
  }

  getUsers():Observable<any>{
    return this.http.get(this.wsUsers)
  }


}
