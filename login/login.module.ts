import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule
  ],
  declarations: [
    LoginComponent
  ],
  entryComponents: [

  ]
})
export class LoginModule { }
