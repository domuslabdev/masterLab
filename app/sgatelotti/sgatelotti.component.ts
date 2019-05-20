import { Component, OnInit, Output, EventEmitter, Input, ViewChild, HostListener, ElementRef, Directive, ContentChild, ComponentRef, ViewChildren, ContentChildren } from '@angular/core';
import { SgateService } from '../service/sgate.service';
import { UrlSegment } from '@angular/router';
import { User, Lotti, Lotto, SgateRequest } from '../model/Lotti';
import { RichiesteComponent } from '../richieste/richieste.component';
import { promise } from 'protractor';
import { PanelComponent } from '../panel/panel.component';
import { NgModel } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { LottoModalComponent } from '../lotto-modal/lotto-modal.component';
import { Moment } from 'moment';
import { filter } from 'rxjs/operators';
import { PoDirective } from '../po.directive';
import { directiveDef } from '@angular/core/src/view';
import { injectViewContainerRef } from '@angular/core/src/render3/view_engine_compatibility';
import { SgatereqsComponent } from '../sgatereqs/sgatereqs.component';
let moment = require('moment');

@Component({
  selector: 'app-sgatelotti',
  templateUrl: './sgatelotti.component.html',
  styleUrls: ['./sgatelotti.component.css']
})
export class SgatelottiComponent implements OnInit {
  lotti: Array<Lotti>;
  reqs:Array<SgateRequest>;
  toto: Date;
  @ViewChild(RichiesteComponent) mode;
  @ContentChild(LottoModalComponent) lottomodal;
  @ViewChild("content") el: ElementRef;
  @ViewChild(PoDirective) podir;
  @ContentChildren("row") trdata;
  closeResult: string;
  modal;
  numberOfClicks = 0;
  lut:Lotto;
  sgatereq:Array< SgateRequest>;
  color:string="colored";
  notcolor:string="none";
  selectedrow:number;
  red="red";

  @Input() set invar(lot:Lotto){
      this.lut=lot;
  };

  stato={
    acquisito:"fa fa-2x fa-check-circle",
    lavorato:"fa fa-hammer"
  }

  //test directive
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
  }
  //

  @HostListener('document:keyup', ['$event'])
  Keyevent(ev: KeyboardEvent) {
    var t = 100;
  }

  constructor(private service: SgateService, private modalService: NgbModal, private _elementRef: ElementRef) {
    // this.lottomodal.esterback.subscribe((x)=>{console.log(x.Desc)});
  }

  ngOnInit() {
   console.log("valore preso dalla podir: "+this.podir.x);
  }

  //registro
  getRemoteModal(lotid: number) {
    var tt1 = this.lotti.filter(x => x.RichiesteTotali > 10);
   // this.service.setModal(lotid);
   var t=this.trdata.then;
   this.mode.getModal(lotid);
  }

  insertLotto() {
    this.service.emitInsLotti.next();
  }

  insertCapLotto(lotto) {
    //  this.service.emitInsCapLotti.emit(lotto.value);
   // this.service.insertCapLotto(lotto).subscribe((x) => { this.getLotti() });
  }

  openCapInsertLottoModal() {
    this.modal = this.modalService.open(this.el);
  }

  getLotti() {
  //  this.service.getLotti("OK").subscribe((x) => {
    this.service.getLotti("OK").toPromise().then(
      (x) => {
       this.lotti = x;
       this.lotti.map(x => x.DataAcquisizione = moment(x.DataAcquisizione).format('MM/DD/YYYY'));
       this.lotti.map(x => x.DataInvioEsiti = moment(x.DataInvioEsiti).format('MM/DD/YYYY'));
       this.lotti.map(x => x.DataCarico = moment(x.DataCarico).format('MM/DD/YYYY'));
       this.lotti.map(x=>x.Desc=this.stato.acquisito);
     })
     .catch((x)=>{console.log("httpclient non va")});

     var lottirev = this.lotti.map(x => new Date(x.DataAcquisizione));
     return this.lotti;
   }
    
  //usati per aprire la modale nel child
  // var tag=this.lottomodal.el;
  // this.lottomodal.openModalfromRemote(tag);

  provapromise(){
    this.service.reqspromise()
    .then((x)=>{
      console.log("dati della fuckoff request: "+x[0].EsitoD)
    })
    .catch((x)=>console.log("non e arrivato niente"+x))
  }

  getSgateReqs(event){
  //  this.service.getSgateReqs(event).subscribe((x:Array<SgateRequest>)=>{this.openSgateReqs(x)});
  this.service.getSgateReqs(event)
  .then((x)=>{
    this.openSgateReqs(x)
  })
  .catch((x)=>{
    console.log("lotto vuoto")
  })
  }

    openSgateReqs(data){
      this.service.openSgateReqsModal("Salva","Abbandona","Lista delle richieste del lotto",data);
    }

    selectrow(index){
       this.selectedrow=index;
    }

}
