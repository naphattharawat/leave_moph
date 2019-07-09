import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { IMyOptions } from 'mydatepicker-th';
import { HolidayService } from 'src/app/services/holiday.service';


registerLocaleData(localeFr);

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  holidayList: any[] = [];
  modalEdit = false;
  currentRow: any;
  editRow: any;
  List: any;


  constructor(
    private holidayService: HolidayService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const result: any = await this.holidayService.getHoliday();
      if (result.rows) {
        console.log(result.rows);
        this.holidayList = result.rows;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onEdit(row) {

    this.currentRow = Object.assign({}, row);
    console.log('row', row.hDateStart);

    this.currentRow.hDateStart = {
      date: {
        year: moment(this.currentRow['hDateStart']).get('year'),
        month: moment(this.currentRow['hDateStart']).get('month') + 1,
        day: moment(this.currentRow['hDateStart']).get('date')
      }
    };
    this.currentRow.hDateEnd = {
      date: {
        year: moment(this.currentRow['hDateEnd']).get('year'),
        month: moment(this.currentRow['hDateEnd']).get('month') + 1,
        day: moment(this.currentRow['hDateEnd']).get('date')
      }
    };
    console.log('edit', this.currentRow['hDateStart']);
    // this.currentRow['dateEnd'] = moment(this.currentRow['dateEnd']).format('YYYY-MM-DD');

    this.currentRow.mode = 'edit';
    this.modalEdit = true;
  }

  onAdd() {
    this.currentRow = {
      hName: '',
      hDateStart: '',
      hDateEnd: '',
      hTotal: 0

    };
    this.currentRow.mode = 'add';
    this.modalEdit = true;
  }

  async onSave() {
    // tslint:disable-next-line: max-line-length
    const sd = moment(`${this.currentRow.hDateStart.date.year}-${this.currentRow.hDateStart.date.month}-${this.currentRow.hDateStart.date.day}`, 'YYYY-MM-DD');
    // tslint:disable-next-line: max-line-length
    const se = moment(`${this.currentRow.hDateEnd.date.year}-${this.currentRow.hDateEnd.date.month}-${this.currentRow.hDateEnd.date.day}`, 'YYYY-MM-DD');

    this.currentRow.hTotal = 0.0;
    this.currentRow.hTotal = se.diff(sd, 'days');

    this.currentRow.hTotal = this.currentRow.hTotal + 1.0;

    try {
      if (se === null) {
        this.alertService.error('กรุณาใส่วันที่ถึง');
      }
      const obj = {
        hDateStart: moment(sd).format('YYYY-MM-DD'),
        hDateEnd: moment(se).format('YYYY-MM-DD'),
        hName: this.currentRow.hName,
        hTotal: this.currentRow.hTotal,
        hId: this.currentRow.hId
      };
      console.log('obj', obj);
      if (this.currentRow.mode === 'edit') {
        if (this.currentRow.hTotal <= 0) {
          this.alertService.error();
          // this.modalEdit = false;
        } else {

          const result = await this.holidayService.updateHoliday(obj);

          if (result['statusCode'] === 200) {
            console.log('result', result['rows']);
            this.alertService.success('สำเร็จ').then(value => {
              console.log('value', value);
              if (value.dismiss) {
                this.getList();
                this.modalEdit = false;
                this.router.navigate(['holiday']);
              }

            });
          } else {
            this.alertService.error();
          }
        }
      } else if (this.currentRow.mode === 'add') {

        if (this.currentRow.hTotal <= 0) {
          this.alertService.error();
          // this.modalEdit = false;
        } else {
          const obj1 = {
            hDateStart: moment(sd).format('YYYY-MM-DD'),
            hDateEnd: moment(se).format('YYYY-MM-DD'),
            hTotal: this.currentRow.hTotal,
            hName: this.currentRow.hName,
            hId: this.currentRow.hId
          };

          const result = await this.holidayService.insertHoliday(obj1);

          if (result['statusCode'] === 200) {
            console.log('result', result['rows']);
            this.alertService.success('สำเร็จ').then(value => {
              console.log('value', value);
              if (value.dismiss) {
                this.getList();
                this.modalEdit = false;
                this.router.navigate(['holiday']);
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


  onDel(row) {
    this.currentRow = Object.assign({}, row);
    console.log('cancel', row);
    this.alertService.confirm()
      .then(async (value) => {
        if (value.value === true) {
          console.log('true');
          const result: any = await this.holidayService.deleteHoliday(this.currentRow.hId);
          this.getList();
          this.router.navigate(['holiday']);
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
  }
}
