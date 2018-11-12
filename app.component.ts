/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, enableProdMode } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { SessionInfService } from './pages/wizly-analytics/shared/services/session-inf.service';
import { BaseSharedComponent } from './pages/wizly-analytics/shared/base/base-shared.component';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent extends  BaseSharedComponent  implements OnInit {

  constructor(private http: Http,private menuService: NbMenuService, 
              public router: Router) {
                super();
                
  }
  

  
  ngOnInit(): void {
    debugger;
    this.http.get('./assets/datasource/config.json')
    .map(response => response.json())
    .subscribe(settings => {
     console.log(settings);
     this.mSessionService.SetSettings(settings);
     debugger;
    });
    
 console.log(this.baseSession());;
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    });
    
  }

 

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      let analyticsSession: SessionInfService = new SessionInfService();
      analyticsSession.DestroySessionInfo();
      this.router.navigate(['auth/signin']);
    }
  }
}
