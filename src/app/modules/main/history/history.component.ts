import { Component, OnInit } from '@angular/core';
import { LeaveService } from './../../../services/leave.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  userList: any;
  date = new Date();
  leaveShow: any;
  modalEdit = false;
  currentRow: any;
  editRow: any;

  constructor(
    private leaveService: LeaveService,
    private router: Router
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.userList = decoded;
  }

  ngOnInit() {
     this.getLeaveShow();

  }

  async getLeaveShow() {
    const result: any = await this.leaveService.getLeaveShow(this.userList['cid']);
    console.log('getLeaveShow', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log('rows:', result.rows);
      this.leaveShow = result.rows;
      console.log('test', this.leaveShow);
      // console.log('g', this.aboutUser);
    }
  }

  async onEdit(row) {
    // this.currentRow = Object.assign(this.leaveShow, this.currentRow);
    this.currentRow = Object.assign({}, row);
    console.log('current', this.currentRow);
    this.currentRow.mode = 'edit';
    this.modalEdit = true;
  }

}
