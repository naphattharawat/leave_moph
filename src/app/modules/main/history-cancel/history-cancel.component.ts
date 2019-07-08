import { LeaveTypeService } from './../../../services/leave-type.service';
import { Component, OnInit } from '@angular/core';
import { LeaveService } from './../../../services/leave.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';

registerLocaleData(localeFr);
@Component({
  selector: 'app-history-cancel',
  templateUrl: './history-cancel.component.html',
  styleUrls: ['./history-cancel.component.scss']
})
export class HistoryCancelComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  userList: any;
  leaveHistoryCancel: any;
  leaveType: any[];
  currentRow: any;

  constructor(
    private leaveService: LeaveService,
    private leaveTypeService: LeaveTypeService,
    private alertService: AlertService,
    private router: Router
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.userList = decoded;
  }

  ngOnInit() {
    this.getleaveHistoryCancel();
  }

  async getleaveHistoryCancel() {
    const result: any = await this.leaveService.leaveHistoryCancel(this.userList['cid']);
    console.log('getleaveAdminHistoryCancel', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log('rows:', result.rows);
      this.leaveHistoryCancel = result.rows;
    }
  }

  async onRestore(row) {
    this.currentRow = Object.assign({}, row);
    console.log('Restore', row);
    this.alertService.restore()
      .then(async (value) => {
        if (value.value === true) {
          console.log('true');
          const result: any = await this.leaveService.restoreLeave(this.currentRow.lId);
          if (result) {
            this.getleaveHistoryCancel();
            this.router.navigate(['history-cancel']);
            console.log('history-cancel', result);
          }
        } else if (value.dismiss) {
          console.log('false');
        }
        console.log('k', value);
      })
      .catch((err) => {
        console.log('false', err);
      });


  }
}
