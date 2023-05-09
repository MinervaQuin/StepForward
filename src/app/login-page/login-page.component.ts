import {Component, inject} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router) {
  }
  private auth: Auth = inject(Auth);
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),

  })


  async loginUser() {
    let userInfo = await signInWithEmailAndPassword(this.auth, <string>this.loginForm.get('email')?.value, <string>this.loginForm.get('password')?.value);
    if(userInfo){
      await this.router.navigate(["/home"])

      //login successful
    } else {
      //login not successful
    }

  }

}
