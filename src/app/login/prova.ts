import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

export class Login {

  loginform = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.minLength(5)]),
    password: new FormControl("", [Validators.required, Validators.minLength(4)])

  })

  isValidetionFailed: boolean;

  constructor(private router: Router, private loService: LoginService) {
    this.isValidetionFailed = false;
  }

  setToken(token: string) {
    localStorage.setItem("myToken", token)

  }

  login() {
    this.loService.login(this.loginform).subscribe(
      (response) => {
        if (response.token == undefined) {
          this.isValidetionFailed = true
        } else {
          this.setToken(response.token)
          this.router.navigate(['/users'])
        }
      }
    )
  }

}
