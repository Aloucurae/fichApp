import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private api: AppService) { }

  socket: any;
  vagas = [];
  ids = [];

  ngOnInit() {
    this.initSocket();
  }

  initSocket() {

    this.socket = this.api.setSocket('localhost:3000');

    this.socket.on('reconnect', (msg) => {
      this.socket.emit('setMaster', 'soueu');
    });

    this.socket.on('userjoined', (data) => {
      if (!this.api.in_array(data.perc['id'], this.ids)) {
        this.ids.push(data.perc['id']);
        this.vagas.push(data.perc);
      }
    });

    this.socket.on('usuarios', (data) => {

      const vagas = Object.values(data.personagens);

      for (const key in vagas) {
        if (vagas.hasOwnProperty(key)) {
          const element = vagas[key];

          if (!this.api.in_array(element['id'], this.ids)) {
            this.ids.push(element['id']);
            this.vagas.push(element);
          }

        }
      }

    });
  }

}
