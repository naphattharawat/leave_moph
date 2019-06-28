import { AboutService } from './../../../services/about.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    personId = '1234565432123' ;
    aboutuser: any[];
    constructor(
      private aboutService: AboutService
      ) {}

<<<<<<< HEAD
    aboutuser: any[] = [];

    constructor(private aboutService: AboutService) {}

=======
>>>>>>> 6bc7841988e4b0d1d782d4269fc6f4d30262c4d8
    ngOnInit() {
      this.getAbout();
    }

    async getAbout() {
<<<<<<< HEAD
      const personId = '1' ;
      const result: any = await this.aboutService.getUserInfo(personId);
      if (result.statusCode === 200 && result.rows.length) {
        this.aboutuser = result.rows;
        console.log('g', result.rows);
=======
      const result: any = await this.aboutService.getUserInfo(this.personId);
      if (result.statusCode === 200 && result.user.length) {
        console.log(result.user);
        this.aboutuser = result.user[0];
        console.log('g', this.aboutuser);
>>>>>>> 6bc7841988e4b0d1d782d4269fc6f4d30262c4d8
      }
    }

}
