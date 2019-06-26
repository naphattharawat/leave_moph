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
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      console.log(this.code);
      this.verifyService.sendCode(this.code);
  });
  }

  ngOnInit() {
  }
  async sendCode() {
    const result: any = this.verifyService.sendCode(this.code);
  }
}
