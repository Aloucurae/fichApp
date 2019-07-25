import { Component, OnInit } from '@angular/core';
declare var require: any;

import { AppService } from '../app.service';

interface PercType {
  id?: number;
}

interface DataPercType {
  perc?: PercType;
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {

  version = require('../../../package.json').version;

  socket: any;
  vagas = [];
  enemies = [];
  ids = [];

  cardSize = 15;

  constructor(private api: AppService) { }

  ngOnInit() {
    this.initSocket();
  }

  initSocket() {

    this.socket = this.api.setSocket('https://localhost:3000');

    this.socket.on('reconnect', (msg) => {
      this.socket.emit('setMaster', 'soueu');
    });

    this.socket.on('userjoined', (data: DataPercType) => {
      if (!this.api.in_array(data.perc.id, this.ids)) {
        this.ids.push(data.perc.id);
        this.vagas.push(data.perc);
      }
    });

    this.socket.on('usuarios', (data) => {

      const vagas = Object.values(data.personagens);

      for (const key in vagas) {
        if (vagas.hasOwnProperty(key)) {
          const element: PercType = vagas[key];

          if (!this.api.in_array(element.id, this.ids)) {
            this.ids.push(element.id);
            this.vagas.push(element);
          }

        }
      }

    });
  }

}


