import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent implements OnInit {

  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  @Input() perc;
  @Input() size = 15;

  assets = {
    hpMax: 100,
    mpMax: 100,
    hp: 85,
    mp: 55
  };

  hideFicha = false;
  modalRef: any;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

}
