import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { FichaComponent } from './ficha/ficha.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BotaoComponent } from './botao/botao.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [PagesComponent, FichaComponent, BotaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProgressbarModule,
    DragDropModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
  ]
})
export class PagesModule { }

