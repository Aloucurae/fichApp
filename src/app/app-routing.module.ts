import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaComponent } from './pages/ficha/ficha.component';

const routes: Routes = [{
  path: 'ficha', component: FichaComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
