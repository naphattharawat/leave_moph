import { LeaveTypeService } from './../../services/leave-type.service';
import { LeaveService } from './../../services/leave.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { IMyOptions } from 'mydatepicker-th';

registerLocaleData(localeFr);
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    disableWeekends: true,
    markCurrentDay: true
    // disableDays: [{ year: 2019, month: 7, day: 12 }],
  };
  jwtHelper = new JwtHelperService();
  userList: any;
  date = new Date();
  leaveShow: any = '';
  modalEdit = false;
  currentRow: any;
  editRow: any;
  leaveType: any[];
  newDate: any;

  lSelect: any;
  dateStart: any;
  dateEnd: any;
  lTypeId: any;
  totalLeave: any;

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
  }

  async getLeaveShow() {
    const result: any = await this.leaveService.getLeaveShow(
      this.userList['cid']
    );
    console.log('getLeaveShow', this.userList['cid']);
    if (result.statusCode === 200 && result.rows.length) {
      this.leaveShow = result.rows;
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
    // this.currentRow['dateStart'] = moment(this.currentRow['dateStart']).format('YYYY-MM-DD');
    this.currentRow.dateStart = {
      date: {
        year: moment(this.currentRow['dateStart']).get('year'),
        month: moment(this.currentRow['dateStart']).get('month') + 1,
        day: moment(this.currentRow['dateStart']).get('date')
      }
    };
    this.currentRow.dateEnd = {
      date: {
        year: moment(this.currentRow['dateEnd']).get('year'),
        month: moment(this.currentRow['dateEnd']).get('month') + 1,
        day: moment(this.currentRow['dateEnd']).get('date')
      }
    };
    console.log('edit', this.currentRow['dateStart']);
    // this.currentRow['dateEnd'] = moment(this.currentRow['dateEnd']).format('YYYY-MM-DD');

    this.currentRow.mode = 'edit';
    this.modalEdit = true;
  }
  onAdd() {
    this.currentRow = {
      lSelect: '',
      dateStart: '',
      dateEnd: '',
      lTypeId: '',
      totalLeave: 0
    };
    this.currentRow.mode = 'add';
    this.modalEdit = true;
  }

  async onSave() {

    // tslint:disable-next-line: max-line-length
    const sd = moment(`${this.currentRow.dateStart.date.year}-${this.currentRow.dateStart.date.month}-${this.currentRow.dateStart.date.day}`, 'YYYY-MM-DD');
    if (this.currentRow.lSelect === '3') {
      // tslint:disable-next-line: max-line-length
      const se = moment(`${this.currentRow.dateEnd.date.year}-${this.currentRow.dateEnd.date.month}-${this.currentRow.dateEnd.date.day}`, 'YYYY-MM-DD');
      this.dateEnd = se;
      console.log('seeee', this.dateEnd);

    } else if (this.currentRow.lSelect === '2' || this.currentRow.lSelect === '1') {
      // tslint:disable-next-line: max-line-length
      this.dateEnd = sd;
      console.log('sooooo', this.dateEnd);

    }
    console.log('sd', sd);
    console.log('se', this.dateEnd);

    this.currentRow.totalLeave = 0.0;
    this.currentRow.totalLeave = this.dateEnd.diff(sd, 'days');

    // console.log(b.diff(a, 'days'));

    if (this.currentRow.lSelect === '3') {
      this.currentRow.totalLeave = this.currentRow.totalLeave + 1.0;
      console.log('3', this.currentRow.totalLeave);
    } else if (
      this.currentRow.lSelect === '1' ||
      this.currentRow.lSelect === '2'
    ) {
      this.currentRow.totalLeave = 0.5;
      console.log('0.5', this.currentRow.totalLeave);
    }


    try {
      if (this.dateEnd === null) {
        this.alertService.error('กรุณาใส่วันที่ถึง');
      }
      const obj = {
        dateStart: moment(sd).format('YYYY-MM-DD'),
        dateEnd: moment(this.dateEnd).format('YYYY-MM-DD'),
        lTypeId: this.currentRow.lTypeId,
        totalLeave: this.currentRow.totalLeave,
        lSelect: this.currentRow.lSelect,
        lId: this.currentRow.lId
      };
      if (this.currentRow.mode === 'edit') {
        const result = await this.leaveService.updateLeave(obj);
        if (obj.totalLeave < 1) {
          this.alertService.error();
        } else {
          if (result['statusCode'] === 200) {
            console.log('result', result['rows']);
            this.alertService.success('สำเร็จ').then(value => {
              console.log('value', value);
              if (value.dismiss) {
                this.getLeaveShow();
                this.modalEdit = false;
                this.router.navigate(['history']);
              }
            });
          } else {
            this.alertService.error();
          }
        }
      } else if (this.currentRow.mode === 'add') {
        const req = {
          dateStart: moment(sd).format('YYYY-MM-DD'),
          dateEnd: moment(this.dateEnd).format('YYYY-MM-DD'),
          lTypeId: this.currentRow.lTypeId,
          totalLeave: this.currentRow.totalLeave,
          lSelect: this.currentRow.lSelect,
          personId: this.userList.cid
        };
        if (req.totalLeave < 1) {
          this.alertService.error();
        } else {
          const result = await this.leaveService.reqLeave(req);
          if (result['statusCode'] === 200) {
            console.log('result', result['rows']);
            this.alertService.success('สำเร็จ').then(value => {
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
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onCancel(row) {
    this.currentRow = Object.assign({}, row);
    console.log('cancel', row);
    this.alertService
      .confirm()
      .then(async value => {
        if (value.value === true) {
          console.log('true');
          const result: any = await this.leaveService.cancelLeave(
            this.currentRow.lId
          );
          this.getLeaveShow();
          if (result) {
            console.log(result);
          }
        } else if (value.dismiss) {
          console.log('false');
        }
        console.log('k', value);
      })
      .catch(err => {
        console.log('false', err);
      });
    // if (this.alertService.confirm()) {
    // }
    // console.log(this.alertService.confirm().then(this.currentRow));
  }
}