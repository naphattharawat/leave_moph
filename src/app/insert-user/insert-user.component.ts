import { Component, OnInit } from '@angular/core';
import { InsertUserService } from '../services/insert-user.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.scss']
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
  createUser: any;
  allUser: any[] = [];

  constructor(private insertUsers: InsertUserService, private rout: Route) {}

  ngOnInit() {
    this.all_user();
  }

  async create_user() {
    try {
      const result: any = await this.insertUsers.createUser(
        this.personId,
        this.hosId,
        this.email,
        this.name,
        this.surname,
        this.tel,
        this.depId,
        this.position
      );
      if (result.rows) {
        this.createUser = result.rows;
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
      }
    } catch (err) {
      console.log(err);
    }
  }
}
