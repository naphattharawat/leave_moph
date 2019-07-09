import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsertUserService } from 'src/app/services/insert-user.service';
import { AlertService } from 'src/app/services/alert.service';
import { DepService } from 'src/app/services/dep.service';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styles: []
})
export class InsertUserComponent implements OnInit {
  personId: any;
  hosId: any;
  email: any;
  name: any;
  surname: any;
  tel: any;
  depId: any;
  position: any;
  genre: any;
  modalEdit = false;
  currentRow: any;
  createUser: any;
  getDepList: any[];
  allUser = [];

  constructor(
    private insertUsers: InsertUserService,
    private alertService: AlertService,
    private depService: DepService,
    private router: Router
  ) { }

  ngOnInit() {
    this.all_user();
    this.getDep();
  }

  async getDep() {
    try {
      const result: any = await this.depService.getDep();
      if (result.rows) {
        this.getDepList = result.rows;
        console.log('list', this.getDepList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onSave() {
    try {
      const obj = {
        personId: this.currentRow.personId,
        hosId: this.currentRow.hosId,
        email: this.currentRow.email,
        name: this.currentRow.name,
        surname: this.currentRow.surname,
        tel: this.currentRow.tel,
        depId: this.currentRow.depId,
        position: this.currentRow.position,
        genre: this.currentRow.genre
      };
      console.log(obj);

      const regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      regexpEmail.test(this.currentRow.email);
      console.log('reg', regexpEmail.test(this.currentRow.email));

      if (regexpEmail.test(this.currentRow.email) === true) {
        const result: any = await this.insertUsers.createUser(
          this.currentRow.personId,
          this.currentRow.hosId,
          this.currentRow.email,
          this.currentRow.name,
          this.currentRow.surname,
          this.currentRow.tel,
          this.currentRow.depId,
          this.currentRow.position,
          this.currentRow.genre
        );

        if (result.rows) {
          // this.createUser = result.rows;
          console.log('re', result);

          this.alertService.success('สำเร็จ').then(value => {
            console.log('value', value);
            if (value.dismiss) {
              this.all_user();
              this.modalEdit = false;
              this.router.navigate(['insert-user']);
            }
          });
        } else {
          this.alertService.error();
        }
      } else {
        this.alertService.error('กรุณากรอกอีเมล์ให้ถูกต้อง');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async all_user() {
    try {
      const result: any = await this.insertUsers.getAllUser();
      if (result.rows) {
        this.allUser = result.rows;
        console.log('user', this.allUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
  onAdd() {
    this.currentRow = {
      personId: '',
      hosId: '',
      email: '',
      name: '',
      surname: '',
      tel: '',
      depId: '',
      position: '',
      genre: ''
    };
    this.currentRow.mode = 'add';
    this.modalEdit = true;
  }
}