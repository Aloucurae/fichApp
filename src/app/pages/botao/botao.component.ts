import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent implements OnInit {

  @Input() perc;
  @Input() size;
  @ViewChild(ContextMenuComponent, { static: false }) public basicMenu: ContextMenuComponent;

  hideFicha = false;

  constructor() { }

  ngOnInit() {
  }

}
