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
  leaveBoxShow: any;
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
   // this.getLeaveTotal();
    this.getLeaveApprove();
    this.getLeaveNotApprove();
    this.getLeaveWaitApprove();
    this.getLeaveBoxShow();

  }
  // async getLeaveTotal() {
  //   const result: any = await this.leaveService.getLeaveTotal(this.userList['cid']);
  //   console.log('leaveTotal', this.userList['cid']);
  //   if (result.statusCode === 200 && result.rows.length) {
  //     console.log(result.rows);
  //     this.leaveTotal = result.rows[0];
  //     // console.log('g', this.aboutUser);
  //   }
  // }
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

  async getLeaveBoxShow() {
    const result: any = await this.leaveService.getLeaveBoxShow(this.userList['cid']);
    console.log('getLeaveBoxShow', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log(result.rows);
      this.leaveBoxShow = result.rows;
      // console.log('g', this.aboutUser);
    }
  }

 }
