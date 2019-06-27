import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    aboutuser: any[] = [];
  
    constructor(private aboutService: AboutService) {}
  
    ngOnInit() {
      this.getAbout();
    }
    
    async getAbout() {
      const personId = '1' ;
      const result: any = await this.aboutService.getUserInfo(personId);
      if (result.statusCode === 200 && result.rows.length) {
        this.aboutuser = result.rows;
        console.log('g',result.rows);
      }
    }
  
}
