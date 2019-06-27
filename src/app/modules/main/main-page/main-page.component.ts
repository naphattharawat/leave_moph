import { VerifyService } from './../../../services/verify.service';
import { Component, OnInit } from '@angular/core';
import { MainService } from './../../../services/main.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  userList: any[] = [];

  constructor(
    private mainService: MainService,
    private verifyService: VerifyService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const result: any = await this.verifyService.getUser();
    if (result.statusCode === 200 && result.users.length) {
      this.userList = result.users;
      console.log('user', this.userList);
    }
  }
}
