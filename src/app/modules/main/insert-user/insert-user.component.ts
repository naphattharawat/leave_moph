import { Component, OnInit } from '@angular/core';
import { InsertUserService } from 'src/app/services/insert-user.service';

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
  createUser: any;
  allUser = [];

  constructor(
    private insertUsers: InsertUserService) { }

  ngOnInit() {
    this.all_user();
  }

  async create_user() {
    // try {
    //   const result: any = await this.insertUsers.createUser(
    //     this.personId,
    //     this.hosId,
    //     this.email,
    //     this.name,
    //     this.surname,
    //     this.tel,
    //     this.depId,
    //     this.position
    //   );
    //   if (result.rows) {
    //     this.createUser = result.rows;
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
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
