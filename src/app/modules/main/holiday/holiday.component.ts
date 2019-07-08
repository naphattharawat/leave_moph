import { LeaveTypeService } from './../../../services/leave-type.service';
import { Component, OnInit } from '@angular/core';
import { HolidayService } from './../../../services/holiday.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';


registerLocaleData(localeFr);
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {

public model: any = { date: { year: 2018, month: 10, day: 9 } };
  jwtHelper = new JwtHelperService();
  userList: any;

  constructor(
    private holiadayService: HolidayService,
    private leaveTypeService: LeaveTypeService,
    private alertService: AlertService,
    private router: Router
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.userList = decoded;
  }

  ngOnInit() {
    this.insertHoliday();
    // this.dateNow = moment().format('MM-DD-YYYY');
    // console.log('moment', this.dateNow);
  }

  async insertHoliday() {

  }

}
