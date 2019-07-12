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

  ngOnInit() {
    this.initSocket();
  }

  initSocket() {

    this.socket = this.api.setSocket('localhost:3000');

    this.socket.on('userjoined', (data) => {
      this.vagas.push(data.perc);
    });

    this.socket.on('usuarios', (data) => {

      const vagas = Object.values(data.personagens);

      for (const key in vagas) {
        if (vagas.hasOwnProperty(key)) {
          const element = vagas[key];
          this.vagas.push(element);
        }
      }

    });


  }

  joinChat() {

    this.socket.connect();
    // this.socket.emit('set-nickname', this.nickname);
  }

}
