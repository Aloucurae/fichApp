import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public socket: any;

  constructor() { }

  getDomain() {
    return location.hostname.split('.')[1];
  }

  getLocal(cname) {
    return localStorage.getItem(cname);
  }

  setLocal(cname, data) {
    localStorage.setItem(cname, JSON.stringify(data));
  }

  delLocal(cname) {
    localStorage.removeItem(cname);
  }

  setSocket(url) {
    this.socket = io(url, { forceNew  : true });
    this.socket.emit('setMaster', 'soueu');
    return this.socket;
  }

  getSocket() {
    return this.socket;
  }

  getFichas() {

    let fichas;

    const f = this.getLocal('fichas');

    if (f && f !== '') {
      fichas = JSON.parse(f);
    } else {
      fichas = [];
    }

    return fichas;
  }

  getFicha(id) {
    const fichas = this.getFichas();
    return fichas[id];
  }

  updFicha(id, perc) {

    const fichas = this.getFichas();

    fichas[id] = perc;

    this.setLocal('fichas', fichas);
    history.back();
  }

  addFicha(perc) {

    const fichas = this.getFichas();

    fichas.push(perc);

    this.setLocal('fichas', fichas);
    history.back();

  }

  remFicha(id) {

  }

  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  in_array(str, arr) {
    let s = false;
    for (const i in arr) {
      if (arr.hasOwnProperty(i)) {
        const a = arr[i];
        if (str === a) {
          s = true;
        }
      }
    }
    return s;
  }
}

