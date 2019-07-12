import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { FichaComponent } from './ficha/ficha.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [PagesComponent, FichaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProgressbarModule
  ]
})
export class PagesModule { }
