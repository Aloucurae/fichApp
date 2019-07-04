import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { FichaComponent } from './ficha/ficha.component';

@NgModule({
  declarations: [PagesComponent, FichaComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
