import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { Pipe, PipeTransform } from '@angular/core';
import { NewHeaderModalComponent } from './modals/new-header.component';
// import { ImportHeaderModalComponent } from './modals/import-header.component';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ThemeModule,
    
    ],
    declarations: [
        HeaderComponent,
        NewHeaderModalComponent,
        
    ],
    entryComponents: [
        // ProjectSelectCellComponent,
        // ProjectPublishCheckCellComponent,
        // ProjectPublishButtonCellComponent,
        NewHeaderModalComponent
        // DeleteProjectModalComponent,
        // PublishProjectModalComponent,
        // ExportProjectModalComponent,
        // ImportProjectModalComponent
      ]
    
})

export class HeaderModule { }

