import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../authentication/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  template: `<h1>Okej radi</h1>
  <button (click)="onTest()" type="button" class="btn btn-success">Test</button>
  <button (click)="onLogout()" type="button" class="btn btn-success">Logout</button>
  `
  })
export class DashboardComponent {

  constructor(private router: Router,private authService:AuthService, private toastrService: ToastrService) {}

  onTest(){
    this.authService.test()
      .subscribe(data => {
        if(data.message == "Your account is ready to use"){
          this.toastrService.success('Successfully called function.');
        }
        else
          this.toastrService.error(data.message);
      });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
