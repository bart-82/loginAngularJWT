import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { TodolistComponent } from './todolist/todolist.component';
import { AuthInterceptor } from './_auth/auth.interceptor';
import{LoginService} from './services/login.service';
import { SharedDataServiceService } from './services/shared-data-service.service';
import { ActorsComponent } from './actors/actors.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    TodolistComponent,
    ActorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [SharedDataServiceService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    LoginService,
    LoginComponent,
  UserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
