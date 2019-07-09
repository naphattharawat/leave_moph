import { AlertService } from '../../services/alert.service';
import { AuthGuardService } from '../../services/auth-guard.service';
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
  ) { }

  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      this.cid = decoded.cid;
      try {
        const result: any = await this.userService.getpersonId(this.cid);
        if (result.ok) {
          if (result.rows.length) {
            // console.log('n', result.rows.personId);
            // this.cid = result.rows[0].personId;
            this.genre = result.rows[0].genre;
            // console.log('found : ', result.rows);
            console.log('genre : ', this.genre);
            if (+this.genre === 1) {
              this.router.navigate(['/user']);
            } else if (+this.genre >= 2 && +this.genre <= 4) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/login']);
            }
          } else {
            console.log('not');
            this.alertService.notFoundUser();
            this.router.navigate(['login']);
          }
        } else {
          this.router.navigate(['login']);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}


