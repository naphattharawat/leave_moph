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

    ngOnInit() {
      this.getAbout();
    }

    async getAbout() {
      const result: any = await this.aboutService.getUserInfo(this.personId);
      if (result.statusCode === 200 && result.rows.length) {
        console.log(result.rows);
        this.aboutuser = result.rows[0];
        console.log('g', this.aboutuser);
      }
    }

}
