import { AlertService } from 'src/app/services/alert.service';
import { DepService } from './../../services/dep.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dep',
  templateUrl: './dep.component.html',
  styles: []
})
export class DepComponent implements OnInit {
  depList: any[] = [];
  modalEdit = false;
  currentRow: any;
  editRow: any;

  constructor(
    private depService: DepService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const result: any = await this.depService.getDep();
      if (result.rows) {
        console.log(result.rows);
        this.depList = result.rows;
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
      depId: '',
      depName: ''
    };
    this.currentRow.mode = 'add';
    this.modalEdit = true;
  }

  async onSave() {
    const obj = {
      depName: this.currentRow.depName,
    };
    try {
      if (this.currentRow.mode === 'add') {
        const result: any = await this.depService.createDep(obj);
        if (result.rows) {
          console.log('add : ', result.rows);
          this.alertService.success('บันทึกสำเร็จ')
            .then((value) => {
              console.log('value', value);
              if (value.dismiss) {
                this.getList();
                this.modalEdit = false;
                this.router.navigate(['department']);
              }
            });
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      } else if (this.currentRow.mode === 'edit') {
        const result: any = await this.depService.editDep(
          this.currentRow.depName, this.currentRow.depId
        );
        if (result.rows) {
          console.log('edit: ', result.rows);
          this.alertService.success('บันทึกสำเร็จ')
            .then((value) => {
              console.log('value', value);
              if (value.dismiss) {
                this.getList();
                this.modalEdit = false;
                this.router.navigate(['department']);
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

}