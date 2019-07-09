
import { UserService } from './../services/user.service';
import { VerifyService } from './../services/verify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AboutService } from '../services/about.service';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  code: any;
  accessToken: any;
  token: any;
  userList: any[];
  cid: any;
  genre: any;

  constructor(
    private verifyService: VerifyService,
    private userService: UserService,
    private aboutService: AboutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(async params => {
      this.code = params['code'];
    });
  }

  ngOnInit() {
    this.sendCode(this.code);
  }

  async sendCode(code: any) {
    const result: any = await this.verifyService.sendCode(code);
    if (result.ok) {
      this.token = result.rows;
      if (this.token) {
        const rs: any = await this.verifyService.getUser(this.token);
        console.log(rs);

        if (rs.users) {
          sessionStorage.setItem('token', rs.token);
          const token = rs.token;
          const decoded = this.jwtHelper.decodeToken(token);
          console.log(decoded);
          await this.checkUser(decoded.cid);
        } else {
          this.router.navigate(['login']);
        }
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  async checkUser(personId: string) {
    try {
      const result: any = await this.userService.getpersonId(personId);
      console.log(result);

      if (result.ok) {
        if (result.rows.length) {
          this.cid = result.rows[0].personId;
          this.genre = result.rows[0].genre;
          console.log('genre : ', this.genre);
          sessionStorage.setItem('genre', this.genre);
          if (this.genre === 1) {
            this.router.navigate(['/user']);
          } else if (this.genre >= 2 && this.genre <= 4) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        console.log(result.error);
        this.router.navigate(['/login']);
      }
    } catch (err) {
      console.log(err);
    }
  }

}
