import { Directive, HostListener, ViewChild } from '@angular/core';
import { SgateService } from './service/sgate.service';
import { Lotto } from './model/Lotti';
import { LottoModalComponent } from './lotto-modal/lotto-modal.component';

@Directive({
  selector: '[confirm]'
})

export class PoDirective {
  x="che cavolo dici";
  lotto:Lotto={
    Desc:"lotto1cacd",
    DataCarico:new Date("22/02/2019"),
    Dim:333,
    Esito:"KO**/**",
    Status:55,
    LotId:987
  }

  @HostListener('click', ['$event'])
 
  keyevent(btn) {
    if(btn.target.id=="btngoogleid")
      this.openModal();
    else if(btn=="btnlocalid")
      console.log("localid");        
    // return window.confirm('Are you sure you want to do this?');
 //  return this.service.modaltestemitter();
  }
 
  constructor(private service:SgateService ) {}

  public openModal(){
//     var res= this.service.confirm("vediamo se funziona realmente ","valore di ritorno",this.lotto)
//     .then((x)=>{
//       if(x=="pippo")

//       console.log("confermato ");
// //      location.href="http://www.google.com";
//         if(x=="poppo")
//           console.log("uscito con tasto esc");
//      })
//      .catch(()=>{
//        console.log("uscito dalla modale")
//        });

this.service.confirm("vediamo se funziona realmente ","valore di ritorno",this.lotto);

this.service.testPromise
  }

}