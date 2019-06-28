import { VerifyService } from './../../../services/verify.service';
import { Component, OnInit } from '@angular/core';
import { MainService } from './../../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  userList: any;
  date = new Date();
  constructor(
    private mainService: MainService,
    private verifyService: VerifyService,
    private router: Router
  ) {
    this.userList = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
    // this.getUser();
  }


}
