import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { SgateService } from '../service/sgate.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Lotto } from '../model/Lotti';

@Component({
  selector: 'app-lotto-modal',
  templateUrl: './lotto-modal.component.html',
  styleUrls: ['./lotto-modal.component.css']
})

export class LottoModalComponent {
  testo = "qua tutto bene";
  estur = new Lotto();
  esterback: EventEmitter<Lotto> = new EventEmitter<Lotto>();
  constructor(private modalservice: NgbModal, private active: NgbActiveModal) {
  }

  // open(x){
  //  const result= this.modalservice.open(this.modalel);
  //  result.componentInstance
  // }

  public decline() {
    this.active.close(false);
  }

  public accept() {
      this.esterback.emit(this.estur);
    this.active.close(true);
  }

  public dismiss() {
    this.active.dismiss();
  }

}
