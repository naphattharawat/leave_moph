import { VerifyService } from './../../../services/verify.service';
import { Component, OnInit } from '@angular/core';
import { MainService } from './../../../services/main.service';
import { LeaveService } from './../../../services/leave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  userList: any;
  date = new Date();
  leaveTotal: any;
  constructor(
    private mainService: MainService,
    private verifyService: VerifyService,
    private leaveService: LeaveService,
    private router: Router
  ) {
    this.userList = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
    this.getLeaveTotal();

  }
  async getLeaveTotal() {
    const result: any = await this.leaveService.getLeaveTotal(this.userList['cid']);
    console.log('leaveTotal', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log(result.rows);
      this.leaveTotal = result.rows[0];
      // console.log('g', this.aboutUser);
    }
  }


}
