import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaComponent } from './pages/ficha/ficha.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [{
  path: 'ficha', component: FichaComponent
}
  , {
  path: '', component: PagesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
