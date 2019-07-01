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

      if (this.token) {
        sessionStorage.setItem('token', this.token);
        const rs: any = await this.verifyService.getUser(this.token);
        if (rs.users) {
          sessionStorage.setItem('user', JSON.stringify(rs.users));
          this.router.navigate(['register']);
        }
      } else {
        this.router.navigate(['login']);
      }
    }
  }
}
