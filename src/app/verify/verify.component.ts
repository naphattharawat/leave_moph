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
  cid: any;

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
          this.checkUser(this.userList.cid);
          // this.checkId(this.userList.cid);
        }
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  async checkUser(personId: string) {
    console.log('check ', personId);
    const result: any = await this.userService.getpersonId(personId);
    console.log(result.rows);
    if (result.rows[0]) {
      // console.log('n', result.rows.personId);
      this.cid = result.rows[0].personId;
        console.log('found : ', this.cid);
        this.router.navigate(['main']);
    } else {
      this.router.navigate(['register']);
      }
    }

    // checkId (id: string) {
    //   return new Promise((resolve: any, reject: any)=> {
    //     console.log('check', id);
    //     const result: any = this.userService.getpersonId(id);
    //     console.log(result);
    //     this.cid = result.rows[0].personId;
    //     console.log(this.cid);
    //     if (result.statusCode === 200) {
    //       console.log('found');
    //       resolve(this.router.navigate(['main']));
    //     } else {
    //       reject(this.router.navigate(['register']));
    //     }
    //   });
    // }

}
