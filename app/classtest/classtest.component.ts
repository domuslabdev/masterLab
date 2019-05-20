import { Component, OnInit, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { SgateService } from '../service/sgate.service';
import { User, Lotti, tabledata, Lotto } from '../model/Lotti';
import { of, Observable, observable } from 'rxjs';
import { map, filter, catchError, mergeMap, sequenceEqual } from 'rxjs/operators';
import { range } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LottiComponent} from '../lotti/lotti.component'
import { compileBaseDefFromMetadata } from '@angular/compiler';
import { AppComponent } from '../app.component';
import { EventEmitter } from 'events';
import { SgatelottiComponent } from '../sgatelotti/sgatelotti.component';

@Component({
  selector: 'app-classtest',
  templateUrl: './classtest.component.html',
  styleUrls: ['./classtest.component.css']
})
export class ClasstestComponent implements OnInit {
  randomcolor;
  visible:boolean=true;
  lotti:Array< User>;
  @ViewChild("test")  el:ElementRef;
  @ViewChild('tasknote') input: ElementRef;
  @ViewChild("insert") insert:ElementRef;
  @ViewChild(SgatelottiComponent) sgate;
  @ViewChild(AppComponent) app;
  //getRowSelected:Function;
  rowselected;
  clcolor="color";
  clfont="font";
  condition:boolean;
  inputuser:string="weccol";
  keyinputel;
  outputngmodel:string;
  data:Array< tabledata>;
  user:User;
  emitdata=new EventEmitter();
  myObservable=of(1,2,3);  //range(1,10);
  h=200;
  w=80;
  lotto:Lotto={
    Desc:"lotto1",
    DataCarico:new Date("22/02/2019"),
    Dim:33,
    Esito:"KO",
    Status:2,
    LotId:0
  }
  // range(1,10).pipe(filter(x=>x%2==1),
  // map(x=>x*x)).subscribe(x=>console.log(x));

  ngAfterViewInit() {
     this.sgate.sgate$.subscribe((x)=>{this.setColor(x)})
     this.app.lotvisible=true;
     // this.input.nativeElement.focus();
   }

  constructor(private service:SgateService,private modalservice:NgbModal) {
    //  this.input.nativeElement.focus();
    //  this.el.nativeElement.focus()
   }

   ngOnInit() {
     this.sgate.sgate$.subscribe((x)=>{this.setColor(x)})
    }

  getusers(){
    this.service.getUser().subscribe((p)=>{this.lotti=p});
  }

    public getRandomColor(event) {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //function to set a new random color
    setColor(event) {
        this.randomcolor = this.getRandomColor("color");
    }

    getRowSelected(index:number,name:string){
      this.rowselected=index;
  //   this.input.nativeElement.focus();
  //   this.el.nativeElement.focus()
      var i=this.data[index].quantity;
    }

    setClasses(){
      return {
         "btn-success":true,
         "font":true,
         "fa fa-amazon":true,
         'is-inactive':true
       };
      }

      addAttr(){
       return true;
      }

      getCol(event:any){
        var id=event.target.innerHTML;
        var el=this.inputuser;
        let val=this.insert.nativeElement.value;
        let val1=this.outputngmodel;
      }

      onKey(event){
       this.keyinputel=event.target.value;
      }

     onCreateTable(index){
       var i=this.data[index].quantity;
     }

      getObeservable(){
        var list=[1,2,3];
       // this.myObservable.subscribe((x)=>{console.log(x)});
       //    this.service.listObservable.subscribe((x)=>console.log(x));
      }

      // getpage(event){
      //  var res= this.service.confirm("vediamo se funziona","valore di ritorno",this.lotto)
      //  .then((x)=>{
      //    if(x==true)
      //      location.href="http://www.google.com";
      //   })
      //   .catch(()=>{
      //     console.log("uscito dalla modale")
      //     });
      //   }

        // provapromise(){
        //   this.service.testPromise()
        //   .then((x)=>{
        //     console.log("dati del fuckoff lotto: "+x.Desc)
        //   })
        //   .catch((x)=>console.log(x))
        // }

getmodalresult(){
  this.service.testPromise()
  .then((x)=>{console.log("esito: "+x.Esito)})
  .catch((x)=>{console.log("stato: "+x)})
}


}
