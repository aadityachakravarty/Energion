import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
      passEnter: new FormControl(null, [Validators.required]),
      passConfirm: new FormControl(null, [Validators.required])
    });
  }

  onSignUp() {
    this.loginService.onSignUp(this.signInForm.value).subscribe(
      response => {
        console.log(response);
        const responseData = JSON.parse(JSON.stringify(response));
        if (responseData.success ) {
          this.router.navigate(['consumer/home']);
          this.loginService.userLoggedIn.next(true);
        } else if ( !responseData.success ) {
          this.signInForm.reset();
          console.log('signUpFailed');
        }
      }
    );
  }

}
