import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {doc} from "firebase/firestore";
import {Firestore, setDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private router: Router) {
  }

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);


  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : {passwordMismatch: true};
  };
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    repeatPassword: new FormControl('', Validators.required),
    acceptTerms: new FormControl(false, Validators.requiredTrue),

  }, {validators: this.passwordMatchValidator});


  async registerUser() {

    try {
      await createUserWithEmailAndPassword(this.auth, <string>this.registerForm.get('email')?.value, <string>this.registerForm.get('password')?.value);

      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userID: string = user.uid;
          const docRef = doc(this.firestore, 'users', userID);

          const userData = {
            coins: 0
          };

          setDoc(docRef, userData)
            .then(() => {
              console.log('Documento creado correctamente');
            })
        }
      });
      await this.router.navigate(["/home"])
    } catch (error) {
      alert("There was an error.\n" + error);
    }

  }

}
