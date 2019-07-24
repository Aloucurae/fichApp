import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { FichaComponent } from './ficha/ficha.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [PagesComponent, FichaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProgressbarModule,
    DragDropModule
  ]
})
export class PagesModule { }
