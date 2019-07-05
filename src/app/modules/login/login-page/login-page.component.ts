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
  genre: number;

  constructor(
    private router: Router,
    private authGuardService: AuthGuardService,
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.cid = decoded.cid;
    console.log('cid ', this.cid);

    try {
      console.log('login check ', this.cid);
      const result: any = await this.userService.getpersonId(this.cid);
      // console.log(result.user);
      if (result.rows.length) {
        // console.log('n', result.rows.personId);
        // this.cid = result.rows[0].personId;
        this.genre = result.rows.genre;
        // console.log('found : ', result.rows);
        console.log('genre : ', this.genre);
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


