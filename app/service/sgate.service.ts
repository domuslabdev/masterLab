import { Injectable, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Lotti, User, Registro, Lotto, SgateRequest } from '../model/Lotti';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, observable, of } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LottoModalComponent } from '../lotto-modal/lotto-modal.component';
import { SgatereqsComponent } from '../sgatereqs/sgatereqs.component';
import { resolve } from 'dns';
import { reject } from 'q';
import { promise } from 'protractor';

const URLlotti = "http://localhost:8360/home/";
const URLapi = "http://localhost:8360/api/cap/Postdata";
const APIREG = "http://localhost:8360/home/getReg";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class SgateService implements OnInit {
  users: Array<User>;
  sgatereqs: Array<SgateRequest>;
  messageSource = new Subject<Array<User>>();
  bilottiDisplay: EventEmitter<string> = new EventEmitter<string>();
  modaltestopen = new EventEmitter<string>();
  //currentmessage=this.messageSource.asObservable();
  emilotti = new EventEmitter<any>();
  emitInsLotti = new Subject<string>();
  emitInsCapLotti = new EventEmitter<string>();
  emitReg = new EventEmitter<string>();
  modalpromise: Promise<any>;
  text = "OK";
  lot: Lotto;
  resultmodalpromise: string;
  reqs:Array<SgateRequest>;

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
  }

  list: any;
  headers: any;

  constructor(private httpclient: HttpClient, private modalservice: NgbModal) {
  }


  // insertCapLotto(lot: string): Observable<string> {
  // }

  // testObserver(observer) {
  //   this.getUser().subscribe((x) => { this.users = x });
  //   observer.next("ciao a todo mundos");
  // }

  getLotti(text: string): Observable<Array<Lotti>> {
    return this.httpclient.post<Array<Lotti>>(URLlotti + "/getLotti", { "text": text }, httpOptions);
  }

  getSgateReqs(lotid: number): Promise<Array<SgateRequest>> {
    return this.httpclient.post<Array<SgateRequest>>(URLlotti + "/getSgateReqs", { "lotid": lotid }).toPromise();
  }

  // getSgateReqs(lotid: number) {
  //   return this.httpclient.post<Array<SgateRequest>>(URLlotti + "/getSgateReqs", { "lotid": lotid }, httpOptions);
  // }


  insertLotto(lot: Lotto): Observable<string> {
    //  var lotto=JSON.stringify(lot);
    return this.httpclient.post<string>(URLlotti + "/setLotti", { "lotto": lot }, httpOptions);
  }

  getUser(): Observable<Array<User>> {
    return this.httpclient.post<Array<User>>(APIREG, this.text);
  }

  getCapReg(): Observable<Array<Registro>> {
    return this.httpclient.post<Array<Registro>>(APIREG, this.text);
  }

  setModal(lotid) {
    this.messageSource.next(lotid);
  }

  setBilotti(text: string) {
    this.bilottiDisplay.emit(text);
  }

  lottomodal() {
    this.emitInsLotti.next("ciao");
  }

  modaltestemitter() {
    this.modaltestopen.emit("ciao");
  }


  confirm(
    title: string,
    message: string,
    lotto: Lotto,
    btnOkText: string = 'Vai Biondinoino',
    btnCancelText: string = 'Annulla',
    dialogSize: 'sm' | 'lg' = 'sm') {

    const modalRef = this.modalservice.open(LottoModalComponent);
    modalRef.componentInstance.estur = lotto;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    modalRef.componentInstance.esterback.subscribe((x) => { this.lot = x });

    modalRef.result
      .then((x) => this.resultmodalpromise = x);

    return modalRef.result;
  }

  testPromise(): Promise<Lotto> {
    return (new Promise((resolve, reject) => {
      if (this.resultmodalpromise)
        resolve(this.lot)
      else
        reject("tutto falso")
    }));
    //    return promise;
  }

  openSgateReqsModal(salva, dismiss, testo, data: Array<SgateRequest>) {
    var res = this.modalservice.open(SgatereqsComponent);
    res.componentInstance.btnOkText = salva;
    res.componentInstance.btnKOText = dismiss;
    res.componentInstance.testo = testo;
    res.componentInstance.reqs = data;
      
    res.componentInstance.reqs$.subscribe((x)=>{this.reqs=x});
    res.result.then((x)=>{this.resultmodalpromise=x});
     
  }

  reqspromise():Promise<Array<SgateRequest>>{
    return (new Promise((resolve,reject)=>{
      if(this.resultmodalpromise)
        resolve(this.reqs)
      else
        reject("errore di comunicazione");
    }));
  }

}