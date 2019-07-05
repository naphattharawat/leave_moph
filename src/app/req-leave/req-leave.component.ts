import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from './../services/leave.service';
import { AlertService } from '../services/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

@Component({
  selector: 'app-req-leave',
  templateUrl: './req-leave.component.html',
  styleUrls: ['./req-leave.component.scss']
})
export class ReqLeaveComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  dateStart: any;
  dateEnd: any;
  totalLeave: any;
  statusHr: any;
  statusBoss: any;
  statusCeo: any;
  personId: any;
  lTypeId: any;
  status: any;
  leaveType: any[];
  // toDay: any;
  lastDay: any;

  constructor(
    private leave: LeaveService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.toDay = moment().format('MM/DD/YYYY');
    // console.log('toDay', this.toDay);

    // this.lastDay = moment().format('YYYY-MM-DD');
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.personId = decoded.cid;
    this.leave_Type();
  }

  async onSave() {
    console.log('test');

    try {
      const startY = moment(this.dateStart).get('year');
      const startM = moment(this.dateStart).get('month');
      const startD = moment(this.dateStart).get('date');

      const endY = moment(this.dateEnd).get('year');
      const endM = moment(this.dateEnd).get('month');
      const endD = moment(this.dateEnd).get('date');

      const s = moment([startY, startM, startD]);
      const e = moment([endY, endM, endD]);

      this.totalLeave = e.diff(s, 'days');
      console.log('total ', this.totalLeave);

      const result: any = await this.leave.reqLeave(
        moment(this.dateStart).format('YYYY-MM-DD'),
        moment(this.dateEnd).format('YYYY-MM-DD'),
        this.totalLeave + 1,
        this.statusHr,
        this.statusBoss,
        this.statusCeo,
        this.personId,
        this.lTypeId,
        this.status
      );

      // console.log('ds', moment(this.dateStart).format('YYYY-MM-DD'));
      // console.log('dateEnd', moment(this.dateEnd).format('YYYY-MM-DD'));

      if (result.ok) {
        console.log('ok', result);
        await this.alertService.success().then(value => {
          console.log('value', value);
          if (value.dismiss) {
            document.location.href = '/history';
          }
        });
        // this.router.navigate(['main']);
      } else {
        console.log(result.rows);
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async leave_Type() {
    const result: any = await this.leave.leaveType();
    if (result.rows) {
      this.leaveType = result.rows;
    }
  }
}
