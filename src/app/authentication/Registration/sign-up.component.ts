import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService} from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent{

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public name: AbstractControl;
  public email: AbstractControl;
  public submitted:boolean = false;


  constructor(fb: FormBuilder, private router: Router, private authService: AuthService, private toastrService: ToastrService) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });


    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
    this.email = this.form.controls['email'];
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onSignUp() {
    this.authService.signup(new User(this.username.value, this.password.value,this.email.value,'user'))
      .subscribe(data => {
        if(data.message == "Succesfully created user"){
          this.toastrService.success('Successfully created account.');
          this.form.reset;
          this.router.navigateByUrl("/login");
        }
        else
          this.toastrService.error(data.message);
      });
  };


}
