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
  constructor(
    private verifyService: VerifyService,
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

  async sendCode(code) {
    const result: any = await this.verifyService.sendCode(code);
    if (result.ok) {
      this.token = result.rows;
      sessionStorage.setItem('token', this.token);
      // this.router.navigate(['main']);
    }
    console.log(sessionStorage.getItem('token'));
  }

  async getUser() {
    const result: any = await this.verifyService.getUser();
    if (result.statusCode === 200 && result.users.length) {
      this.userList = result.users;
      console.log(result.users);

     // console.log('user', this.userList);
    }
  }
}
