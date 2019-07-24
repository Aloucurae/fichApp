import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal/';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  @Input() perc;

  // perc = {
  //   nome: ''
  //   , pont: 0
  //   , forc: 0
  //   , habi: 0
  //   , resi: 0
  //   , armd: 0
  //   , podf: 0
  //   , vant: []
  //   , dvan: []
  //   , hist: ''
  // };

  assets = {
    hpMax: 100,
    mpMax: 100,
    hp: 85,
    mp: 55
  };

  id;
  somapts = 0;
  modalRef: any;
  soket: any;

  constructor(private api: AppService, private modalService: BsModalService) { }

  ngOnInit() {
    this.soket = this.api.getSocket();
  }

  loadPersonagem(id) {
    this.perc = this.api.getFicha(id);
  }

  addAttrs(attr) {
    if (this.somaPontos()) {
      this.perc[attr]++;
    }
    this.soket.emit('message', this.perc);
  }

  remAttrs(attr) {
    this.perc[attr]--;
    if (this.perc[attr] < 0) {
      this.perc[attr] = 0;
    }
    this.somaPontos();
    this.soket.emit('message', this.perc);
  }

  somaPontos() {

    let val = this.perc.forc + this.perc.habi + this.perc.resi + this.perc.armd + this.perc.podf + 1;

    for (const vant of this.perc.vant) {
      val = val + parseInt(vant.value);
    }

    for (const dvan of this.perc.dvan) {
      val = val - parseInt(dvan.value);
    }

    this.somapts = this.perc.pont - val;

    return (this.perc.pont - val) > 0;
  }

  addVants(attr) {
    this.perc[attr].push({ desc: '', value: 0 });
  }

  remVants(attr, id) {
    this.perc[attr].splice(id, 1);
  }

  salvaPersonagem() {

    this.somaPontos();

    if (this.perc.nome !== '') {

      if ((this.somapts + 1) >= 0) {

        if (this.id) {

          this.api.updFicha(this.id, this.perc);
        } else {
          this.api.addFicha(this.perc);
        }

      } else {
        alert('Personagem com pontos a mais');
      }

    } else {
      alert('O Campo nome é obrigatório!');
    }

  }

  remAssets(att, val) {
    this.assets[att] = this.assets[att] - parseInt(val);
    if (this.assets[att] < 0) {
      this.assets[att] = 0;
    }

    this.soket.emit('chengeAssets', {
      id: this.perc.id
      , assets: this.assets
      , msg: att + ' - ' + val
    });
  }

  addAssets(att, val) {
    this.assets[att] = this.assets[att] + parseInt(val);
    if (this.assets[att] > this.assets[att + 'Max']) {
      this.assets[att] = this.assets[att + 'Max'];
    }

    this.soket.emit('chengeAssets', {
      id: this.perc.id
      , assets: this.assets
      , msg: att + ' + ' + val
    });
  }

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

}
