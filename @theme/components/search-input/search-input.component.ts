import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'ngx-search-input',
  styleUrls: ['./search-input.component.scss'],
  template: `
    <i class="control-icon ion ion-ios-search"
       (click)="showInput()"></i>
    <input placeholder="Type your search request here..."
           #input
           [class.hidden]="!isInputShown"
           (blur)="hideInput()"
           (input)="onInput($event)">
  `,
})
export class SearchInputComponent {

  constructor(
    private router: Router,
   ) {
}
;


  @ViewChild('input') input: ElementRef;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  isInputShown = false;

  showInput() {
    alert();
    
    this.isInputShown = true;
    
    this.input.nativeElement.focus();
    alert("asdlkjhgfdkjhbgfv");
   // this.router.navigate(['./pages/wizly-analytics/search']);  
  }

  hideInput() {
    this.isInputShown = false;
    alert("asdlkjhgfdkjhbgfv"); 
  }

  onInput(val: string) {
    debugger;
    alert(val);
    this.search.emit(val);
    alert("asdlkjhgfdkjhbgfv");
  }
}
