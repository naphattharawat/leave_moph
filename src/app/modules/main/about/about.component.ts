import { Router } from '@angular/router';
import { AlertService } from './../../../services/alert.service';
import { UserService } from './../../../services/user.service';
import { AboutService } from './../../../services/about.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  aboutUser: any[];
  userList: any;
  modalEdit = false;
  currentRow: any;
  editRow: any;

    constructor(
      private aboutService: AboutService,
      private alertService: AlertService,
      private userService: UserService,
      private router: Router
      ) {
        const token = sessionStorage.getItem('token');
        const decoded = this.jwtHelper.decodeToken(token);
        this.userList = decoded;
      }

    ngOnInit() {
      this.getAbout();
    }

    async getAbout() {
      const result: any = await this.aboutService.getUserInfo(this.userList.cid);
      console.log('user', this.userList.cid);
      if (result.statusCode === 200 && result.rows.length) {
        console.log(result.rows);
        this.aboutUser = result.rows[0];
      }
    }

    async onEdit(row) {
      this.currentRow = Object.assign(this.aboutUser, this.currentRow);
      this.editRow = Object.assign({}, this.currentRow);
      console.log('current', this.currentRow);
      this.currentRow.mode = 'edit';
      this.modalEdit = true;
    }

    async onSave() {
      try {
        const regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
        regexpEmail.test(this.editRow.email);
        console.log('reg', regexpEmail.test(this.editRow.email));
        if (regexpEmail.test(this.editRow.email) === true) {
          const result: any = await this.userService
            .updateUser(this.editRow.tel, this.editRow.email, this.editRow.personId);
          if (result.ok) {
            await this.alertService.success();
            this.getAbout();
            this.modalEdit = false;
            this.router.navigate(['about']);
          } else {
            this.alertService.error();
          }
        } else {
          this.alertService.error(' กรุณากรอก email ให้ถูกต้อง');
        }
      } catch (error) {
        console.log(error);
      }
    }

}
