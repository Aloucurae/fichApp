import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor() { }

  vagas = [];

  ngOnInit() {

    for (let index = 0; index < 4; index++) {
      this.addVaga();
    }
  }

  addVaga() {
    this.vagas.push({});
  }

  remVaga() {

  }

}
