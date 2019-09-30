import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ToastyConfig } from 'ng2-toasty';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }

}
