import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit{

  public form:FormGroup;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public id;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private authService: AuthService,private toastrService: ToastrService, private route: ActivatedRoute, private router: Router) {

    this.form = fb.group({
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: this.validate('password', 'repeatPassword')})
    });

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  public onSubmit(values: any):void {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.verifyAccount(values.passwords.password, this.id)
        .subscribe(data => {
            if(data.message == 'Your account is ready to use') {
              this.toastrService.success('You just changed your account password.', 'Great!');
              this.router.navigateByUrl("/login");
            }else
              this.toastrService.warning(''+ data.message, 'Validation Error');
          }
        );
    }
  }

  public validate(firstField, secondField) {

    return (c: FormGroup) => {

      return (c.controls && c.controls[firstField].value == c.controls[secondField].value) ? null : {
        passwordsEqual: {
          valid: false
        }
      };
    }
  }



}
