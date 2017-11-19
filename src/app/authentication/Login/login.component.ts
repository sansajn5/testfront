import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService} from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent{

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private router: Router, private authService: AuthService, private toastrService: ToastrService) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onLogin():void {
    this.authService.signin(new User(this.username.value,this.password.value))
      .subscribe(data => {
        if (data.message != '' && data.message != 'You\'re account is not activated!' && data.message != 'Invalid login') {
          localStorage.setItem('token', data.message);
          localStorage.setItem('user', this.username.value);
          this.toastrService.info('I\'m glad to see you again!', 'Hi there, ' + this.username.value + '.');
          this.router.navigateByUrl('/pages');
        } else {
          this.toastrService.error(' '+data.message,'Authentication error');
          this.form.reset;
        }
      });
  }

  onSignUp() {
    this.router.navigateByUrl("/signup");
  }



}
