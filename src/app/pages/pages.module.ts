import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { FichaComponent } from './ficha/ficha.component';

@NgModule({
  declarations: [PagesComponent, FichaComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }
