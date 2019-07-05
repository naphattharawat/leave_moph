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
  leaveType: any[];
  newDate: any;

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
    this.getLeaveShow();
    this.getLeaveType();
    // this.dateNow = moment().format('MM-DD-YYYY');
    // console.log('moment', this.dateNow);
  }

  async getLeaveShow() {
    const result: any = await this.leaveService.getLeaveShow(this.userList['cid']);
    console.log('getLeaveShow', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      console.log('rows:', result.rows);
      this.leaveShow = result.rows;
      // console.log('test', this.leaveShow);
      // console.log('date', this.leaveShow[0].dateStart);
      // console.log('g', this.aboutUser);
    }
  }

  async getLeaveType() {
    const result: any = await this.leaveTypeService.getLeaveType();
    try {
      if (result.rows.length) {
        this.leaveType = result.rows;
        // console.log('LT ', this.leaveType);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onEdit(row) {
    // this.currentRow = Object.assign(this.leaveShow, this.currentRow);
    this.currentRow = Object.assign({}, row);
    console.log('row', row.dateStart);
    // this.newDate = moment(row.dateStart).format('MM-DD-YYYY');
    this.currentRow['dateStart'] = moment(this.currentRow['dateStart']).format('MM-DD-YYYY');
    this.currentRow['dateEnd'] = moment(this.currentRow['dateEnd']).format('MM-DD-YYYY');

    this.currentRow.mode = 'edit';
    this.modalEdit = true;
  }

  async onSave() {
    const sd = this.currentRow['dateStart'];

    const startYear = moment(sd).get('year');
    const startMonth = moment(sd).get('month');
    const startDate = moment(sd).get('date');
    const se = this.currentRow['dateEnd'];
    const endYear = moment(se).get('year');
    const endMonth = moment(se).get('month');
    const endDate = moment(se).get('date');

    const a = moment([startYear, startMonth, startDate]);
    const b = moment([endYear, endMonth, endDate]);
    // console.log(b.diff(a, 'days'));
    this.currentRow.totalLeave = 0.0;
    this.currentRow.totalLeave = b.diff(a, 'days');
    if (this.currentRow.lSelect === '3') {
      this.currentRow.totalLeave = this.currentRow.totalLeave + 1.0;
      console.log('3', this.currentRow.totalLeave);
    } else if (this.currentRow.lSelect === '1' || this.currentRow.lSelect === '2') {
      this.currentRow.totalLeave = 0.5;
      this.currentRow.dateEnd = this.currentRow.dateStart;
      console.log('0.5', this.currentRow.totalLeave);
    }

    try {
      if (this.currentRow.dateEnd === null) {
        this.alertService.error('กรุณาใส่ที่ถึง');
      }
      this.currentRow.dateStart = moment(this.currentRow['dateStart']).format('YYYY-MM-DD');
      this.currentRow.dateEnd = moment(this.currentRow['dateEnd']).format('YYYY-MM-DD');
      const result: any = await this.leaveService.updateLeave(
        this.currentRow.dateStart, this.currentRow.dateEnd, this.currentRow.totalLeave,
        this.currentRow.lTypeId, this.currentRow.lSelect, this.currentRow.lId
      );
      if (result.statusCode === 200) {
        console.log('result', result.rows);
        this.alertService.success('แก้ไขสำเร็จ')
        .then((value) => {
          console.log('value', value);
          if (value.dismiss) {
            this.getLeaveShow();
            this.modalEdit = false;
            this.router.navigate(['history']);
            // document.location.href = '/history';
          }
        });
      } else {
        this.alertService.error();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onCancel(row) {
    this.currentRow = Object.assign({}, row);
    console.log('cancel', row);
    this.alertService.confirm()
      .then(async (value) => {
        if (value.value === true) {
          console.log('true');
          const result: any = await this.leaveService.cancelLeave(this.currentRow.lId);
          if (result) {
            console.log(result);
          }
        } else if (value.dismiss) {
          console.log('false');
        }
        console.log('k', value);
      })
      .catch((err) => {
        console.log('false', err);
      });
    // if (this.alertService.confirm()) {
    // }
    // console.log(this.alertService.confirm().then(this.currentRow));

  }

}
