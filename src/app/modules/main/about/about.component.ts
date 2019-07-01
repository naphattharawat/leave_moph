import { AboutService } from './../../../services/about.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    userList: any;

    constructor(
      private aboutService: AboutService
      ) {
        this.userList = JSON.parse(sessionStorage.getItem('user'));
      }

    ngOnInit() {

    }

}
