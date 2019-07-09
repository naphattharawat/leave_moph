import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LeaveTypeService } from '../../services/leave-type.service';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent implements OnInit {
  leaveTypeList: any[] = [];
  modalEdit = false;
  currentRow: any;
  editRow: any;

  constructor(
    private leaveTypeService: LeaveTypeService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const result: any = await this.leaveTypeService.getLeaveType();
      if (result.rows) {
        console.log(result.rows);
        this.leaveTypeList = result.rows;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onEdit(row) {
    this.currentRow = Object.assign({}, row);
    this.currentRow.mode = 'edit';
    this.modalEdit = true;
  }

  onAdd() {
    this.currentRow = {
      lTypeId: '',
      lTypeName: '',
      is_total: ''
    };
    this.currentRow.mode = 'add';
    this.modalEdit = true;
  }

  async onSave() {
    const obj = {
      lTypeName: this.currentRow.lTypeName,
      is_total: this.currentRow.is_total
    };
    try {
      if (this.currentRow.mode === 'add') {
        const result: any = await this.leaveTypeService.insertLeaveType(obj);
        if (result.rows) {
          console.log('add : ', result.rows);
          this.alertService.success('บันทึกสำเร็จ')
            .then((value) => {
              console.log('value', value);
              if (value.dismiss) {
                this.getList();
                this.modalEdit = false;
                this.router.navigate(['leaveType']);
              }
            });
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      } else if (this.currentRow.mode === 'edit') {
        const result: any = await this.leaveTypeService.updateLeaveType(
          this.currentRow.lTypeName, this.currentRow.is_total, this.currentRow.lTypeId
        );
        if (result.rows) {
          console.log('edit: ', result.rows);
          this.alertService.success('บันทึกสำเร็จ')
            .then((value) => {
              console.log('value', value);
              if (value.dismiss) {
                this.getList();
                this.modalEdit = false;
                this.router.navigate(['leaveType']);
              }
            });
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
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
          const result: any = await this.leaveTypeService.delLeaveType(this.currentRow.lTypeId);
          this.getList();
          this.router.navigate(['leaveType']);
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
