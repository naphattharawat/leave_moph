import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './../../services/alert.service';
import { DepService } from './../../services/dep.service';
import { AboutService } from './../../services/about.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  userList: any;
  depList: any[];

  personId: any;
  position: any;
  name: any;
  surname: any;
  tel: any;
  email: any;
  depId: any;
  hosId: any;

  constructor(
    private depService: DepService,
    private aboutService: AboutService,
    private router: Router,
    private alertService: AlertService
  ) {
    // this.userList = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.personId = decoded.cid;
    this.hosId = decoded.id;
    this.email = decoded.email;
    this.name = decoded.name;
    this.surname = decoded.last_name;
    this.tel = decoded.telephone;
    this.position = decoded.job_position;
    // console.log(this.personId);
  }

  ngOnInit() {
    this.getDep();
  }

  async getDep() {
    const result: any = await this.depService.getUserInfo();
    if (result.rows.length) {
      this.depList = result.rows;
    }
    // console.log(this.depList);
  }

  async onSave() {
    try {
      const result: any = await this.aboutService.createUser(
        this.personId,
        this.hosId,
        this.email,
        this.name,
        this.surname,
        this.tel,
        this.depId,
        this.position
      );

      if (result.ok) {
        await this.alertService.success();
        this.router.navigate(['main']);
      } else {
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
