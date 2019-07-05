import { AlertService } from './../../../services/alert.service';
import { AuthGuardService } from './../../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  isError = false;
  cid: string;

  constructor(
    private router: Router,
    private authGuardService: AuthGuardService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.cid = decoded.cid;
    console.log('cid ', this.cid);

    try {
      console.log('check ', this.cid);
      const result: any = await this.userService.getpersonId(this.cid);
      console.log(result.rows);
      if (result.rows.length) {
        // console.log('n', result.rows.personId);
        this.cid = result.rows.length;
        console.log('found : ', this.cid);
        this.router.navigate(['main']);
      } else {
        console.log('not');
        this.alertService.notFoundUser();
        this.router.navigate(['login']);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

// onLogin() {
//   // tslint:disable-next-line:max-line-length
// tslint:disable-next-line: max-line-length
//   sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJKb2huIERvZSIsImxldmVsIjoyLCJpYXQiOjE1MzYyMzkwMjJ9.DEY5VNuDqMBcoNdis1asgHwHV5opwqF0C1sPXsB0DeY');
//   this.router.navigate(['main']);
// }
