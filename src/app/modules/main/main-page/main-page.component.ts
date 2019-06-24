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
