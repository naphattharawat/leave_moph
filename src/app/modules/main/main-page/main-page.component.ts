import { VerifyService } from './../../../services/verify.service';
import { Component, OnInit } from '@angular/core';
import { MainService } from './../../../services/main.service';
import { LeaveService } from './../../../services/leave.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  userList: any;
  date = new Date();
  leaveTotal: any;
  leaveApprove: any;
  leaveNotApprove: any;
  leaveWaitApprove: any;
  leaveShow: any;
  constructor(
    private mainService: MainService,
    private verifyService: VerifyService,
    private leaveService: LeaveService,
    private router: Router
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.userList = decoded;
  }

  ngOnInit() {
    this.getLeaveTotal();
    this.getLeaveApprove();
    this.getLeaveNotApprove();
    this.getLeaveWaitApprove();
    this.getLeaveShow();

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
  async getLeaveApprove() {
    const result: any = await this.leaveService.getLeaveApprove(this.userList['cid']);
    console.log('leaveApprove', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log(result.rows);
      this.leaveApprove = result.rows[0];
      // console.log('g', this.aboutUser);
    }
  }

  async getLeaveNotApprove() {
    const result: any = await this.leaveService.getLeaveNotApprove(this.userList['cid']);
    console.log('leaveNotApprove', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log(result.rows);
      this.leaveNotApprove = result.rows[0];
      // console.log('g', this.aboutUser);
    }
  }

  async getLeaveWaitApprove() {
    const result: any = await this.leaveService.getLeaveWaitApprove(this.userList['cid']);
    console.log('getLeaveWaitApprove', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log(result.rows);
      this.leaveWaitApprove = result.rows[0];
      // console.log('g', this.aboutUser);
    }
  }

  async getLeaveShow() {
    const result: any = await this.leaveService.getLeaveShow(this.userList['cid']);
    console.log('getLeaveShow', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log(result.rows);
      this.leaveShow = result.rows[0];
      // console.log('g', this.aboutUser);
    }
  }



}
