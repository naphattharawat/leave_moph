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

  constructor(
    private verifyService: VerifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(async params => {
      this.code = params['code'];
      console.log(this.code);
      await this.verifyService.sendCode(this.code);
  });
  }

  ngOnInit() {
  }
  async sendCode(code) {
    const result: any = await this.verifyService.sendCode(code);
    // window.location.href = 'http://localhost:3001/verify/code=' , this.code;
  }
}
