import { MainService } from '../../services/main.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: any[] = [];

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const result: any = await this.mainService.getUser();
    if (result.statusCode === 200 && result.rows.length) {
      this.userList = result.rows;
      console.log('user', this.userList);
    }
  }

}

