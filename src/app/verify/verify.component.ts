import { AboutService } from './../services/about1.serivce';
import { UserService } from './../services/user.service';
import { VerifyService } from './../services/verify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';



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
        if (rs.users) {
          sessionStorage.setItem('token', rs.token);
          const token = rs.token;
          const decoded = this.jwtHelper.decodeToken(token);
          console.log(decoded);
          this.checkUser(decoded.cid);
        }
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  async checkUser(personId: string) {
    try {
      console.log('check ', personId);
      const result: any = await this.userService.getpersonId(personId);
      console.log(result.rows);
      if (result.rows.length) {
        // console.log('n', result.rows.personId);
        this.cid = result.rows[0].personId;
        this.genre = result.rows[0].genre;
        console.log('genre : ', this.genre);
        sessionStorage.setItem('genre', this.genre);
        this.router.navigate(['main']);
      } else {
        console.log('not');
        this.router.navigate(['login']);
      }
    } catch (err) {
      console.log(err);
    }
  }

}
