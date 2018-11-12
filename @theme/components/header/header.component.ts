import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { SessionInfService } from '../../../pages/wizly-analytics/shared/services/session-inf.service';
import { NewHeaderModalComponent } from './modals/new-header.component';
import { ModelImportService } from './shared/services/ModelImport.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewExportModalComponent } from './modals/new-export.component';  
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [ ModelImportService]
})

export class HeaderComponent implements OnInit, AfterViewInit{
  
  @Input() position = 'normal';
  // @Input() rowData: any[];
  // @Input() quickFilterTxt:string;
  quickFilterTxt;
  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router,
              private customModalService: NgbModal, 
              private userService: UserService) {
  }
  ;
  open() {
    debugger;
    // if(this.quickFilterTxt!=undefined){
    // const modalRef = this.customModalService.open(NewHeaderModalComponent);
    
    //  modalRef.componentInstance.quickFilter = this.quickFilterTxt;
    this.router.navigate(['/pages/wizly-analytics/myprocesses']);
       
      }
export(){
  const modalRef = this.customModalService.open(NewExportModalComponent);
  //modalRef.componentInstance.quickFilter = this.quickFilterTxt;
}
    




   

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);


      let analyticsSessionService: SessionInfService = new SessionInfService();

      this.user.name = analyticsSessionService.GetSessionInfo().userName;
      this.user.picture = 'assets/images/no-photo.png';

      
  }

  // this.quickFilterTxtRepo = quickFilterTxt;
  // modalRef.componentInstance.quickFilterTxt = quickFilterTxt;

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
   // this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    //this.router.navigate(['/pages/wizly-analytics/myprocesses']);
    this.router.navigate(['./pages/wizly-analytics/search']);      
    alert();
  }

  ngAfterViewInit(): void {
    $(".search-label").on("click", (e) => {
      debugger;
      e.preventDefault();
      $(".search-text").toggleClass("collapsed");
      $(".search-text").focus();
    });
  
  }
}
