import { AboutService } from './../services/about1.serivce';
import { UserService } from './../services/user.service';
import { VerifyService } from './../services/verify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  code: any;
  accessToken: any;
  token: any;
  userList: any[];
  cid: string;

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
        sessionStorage.setItem('token', this.token);
        const rs: any = await this.verifyService.getUser(this.token);
        if (rs.users) {
          sessionStorage.setItem('user', JSON.stringify(rs.users));
          this.userList = JSON.parse(sessionStorage.getItem('user'));
          this.checkUsername(this.userList.cid);
        }
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  async checkUsername(personId: string) {
    console.log('check ', personId);
    const result: any = await this.userService.getpersonId(personId);
    this.cid = result.rows[0].personId;
    try {
      if (result.statusCode) {
        console.log('found : ', this.cid);
        this.router.navigate(['main']);
      }
    } catch (err) {
        // console.log('n', result.rows.personId);
        console.log('not found');
        this.router.navigate(['register']);
    }
  }

}
