import { LeaveService } from './../../services/leave.service';
import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    disableWeekends: true,
    markCurrentDay: true,
  };
  today: any;
  userList: any[] = [];
  dateStart: any;
  dateEnd: any;
  leaveToday: any;
  constructor(
    private leaveService: LeaveService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    moment.locale('th');
    this.today = moment().format('dddd, Do MMMM  YYYY');
    this.getList();
  }

  async getList() {
    try {
      const result: any = await this.leaveService.getToday();
      let j = 0;
      if (result.rows.length) {
        console.log(result.rows);
        for (let i = 0; i < result.rows.length; i++) {
          this.dateStart = moment(result.rows[i].dateStart).format('YYYY-MM-DD');
          this.dateEnd = moment(result.rows[i].dateEnd).format('YYYY-MM-DD');
          console.log('date ', this.dateStart, this.dateEnd);
          this.leaveToday = moment().isBetween(this.dateStart, this.dateEnd);
          console.log('lt', this.leaveToday);
          if (this.leaveToday === true) {
            this.userList[j] = result.rows[i];
            this.userList[j].dateStart = moment(result.rows[i].dateStart).format('Do MMMM  YYYY');
            this.userList[j].dateEnd = moment(result.rows[i].dateEnd).format('Do MMMM  YYYY');
            j++;
          }
        }
        console.log('leave ', this.userList);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async onSearch(dateSearch) {
  //   try {
  //     const result: any = await this.leaveService.getToday();
  //     let j = 0;
  //     if (result.rows.length) {
  //       console.log(result.rows);
  //       for (let i = 0; i < result.rows.length; i++) {
  //         this.dateStart = moment(result.rows[i].dateStart).format('YYYY-MM-DD');
  //         this.dateEnd = moment(result.rows[i].dateEnd).format('YYYY-MM-DD');
  //         console.log('date ', this.dateStart, this.dateEnd);
  //         this.leaveToday = moment(dateSearch).isBetween(this.dateStart, this.dateEnd);
  //         console.log('lt', this.leaveToday);
  //         if (this.leaveToday === true) {
  //           this.userList[j] = result.rows[i];
  //           this.userList[j].dateStart = moment(result.rows[i].dateStart).format('Do MMMM  YYYY');
  //           this.userList[j].dateEnd = moment(result.rows[i].dateEnd).format('Do MMMM  YYYY');
  //           j++;
  //         }
  //       }
  //       console.log('leave ', this.userList);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

}