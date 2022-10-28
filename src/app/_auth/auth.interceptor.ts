import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { LoginComponent } from "../login/login.component";
import { Router } from '@angular/router'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginComponent, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.login.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err.status);
          // if (err.status === 401) {
          //   this.router.navigate(['/login']);
          // }

          return throwError("Some thing is wrong");
        }
      )
    );



  }

  private addToken(request: HttpRequest<any>, token: string | null) {
    return request.clone(
      {
        setHeaders: {
          Authorization: `${token}`
        }
      }
    )
  }


  /*  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
       const token=this.login.getToken

       const correctReq=req.clone({
           headers:req.headers.set('Authorization', `${token}`)
   });

       return next.handle(correctReq);
   } */

}
