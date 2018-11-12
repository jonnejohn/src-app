import {
  Component, OnInit, AfterViewInit, ViewChild,
  OnDestroy, AfterViewChecked, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { GridOptions, RowNode } from "ag-grid";

import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseSharedComponent } from '../pages/wizly-analytics/shared/base/base-shared.component';
import { AuthService } from '../pages/wizly-analytics/shared/services/auth.service';
import { LDAPSettingsService } from '../pages/wizly-analytics/shared/services/LDAPSettings.service';
import { QPRService } from '../login/qpr.service';
import { model } from '../login/model';
import { SessionInfService } from '../pages/wizly-analytics/shared/services/session-inf.service';


declare var $: any;

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, LDAPSettingsService, QPRService]
})


export class LoginComponent extends BaseSharedComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {


  constructor(public router: Router, private qprService : QPRService,private modalService: NgbModal,
    private _service: AuthService, private LDAPSettingsService: LDAPSettingsService) {

    super();

  }
data:model;
  ngOnDestroy() {

  }

  ngAfterViewChecked() {

  }


  ngOnInit() {

  }

  ngAfterViewInit(): void {
  }

  LDAPAuth: string;
  username: string;
  password: string;
  
  login() {
  
   this.getLogin();
  

  }
  getLogin(): void {
    debugger;
    this.qprService.getLogin(this.username, this.password,this.baseSession().apiurl,this.baseSession().webservice).then((res) => {
debugger;
this.data=res;
          this.mSessionService.SetUser(this.username, this.username, res.password,true,res.uip); 
          //To save
          debugger;
          //this.mSessionService.Setdata(this.username, this.username, res.password,true,res.uip);
          debugger;

          
          var enc = window.btoa(this.baseSession().password);
          var dec = window.atob(enc);


          console.log(this.baseSession());
          //this.router.navigate(['pages']); 
          this.router.navigate(['pages/demo/'+this.baseSession().modelid+'-0']);                                                                                                                                             
});
  
}
}

                                                                                                                                     




