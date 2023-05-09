import {Component, inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private router: Router) {
  }
  private auth: Auth = inject(Auth);

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
    acceptTerms: new FormControl(false),

  })


  async registerUser() {
    let userInfo = await createUserWithEmailAndPassword(this.auth, <string>this.registerForm.get('email')?.value, <string>this.registerForm.get('password')?.value);
    if(userInfo){
      await this.router.navigate(["/home"])

      //register successful
    } else {
      //register not successful
    }

  }

}
