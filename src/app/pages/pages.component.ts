import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private socket: Socket) { }

  vagas = [];

  ngOnInit() {

    for (let index = 0; index < 1; index++) {
      this.addVaga();
    }
  }

  addVaga() {
    this.vagas.push({});
  }

  remVaga() {

  }

  joinChat() {

    this.socket.connect();
    // this.socket.emit('set-nickname', this.nickname);
  }

}
