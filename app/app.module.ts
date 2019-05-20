import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LottiComponent } from './lotti/lotti.component';
import { RichiesteComponent } from './richieste/richieste.component';
import {SgateService} from './service/sgate.service';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LottoComponent } from './lotto/lotto.component';
import { FormsModule } from '@angular/forms';
import { ClasstestComponent } from './classtest/classtest.component';
import { PanelComponent } from './panel/panel.component';
import { RegistroComponent } from './registro/registro.component';
import { LottoModalComponent } from './lotto-modal/lotto-modal.component';
import { PoDirective } from './po.directive';
import { SgatelottiComponent } from './sgatelotti/sgatelotti.component';
import { SgatereqsComponent } from './sgatereqs/sgatereqs.component';

const routes:Routes=[
  
  {
    path:'lotto/:id',
    component:LottoComponent
  },
  {
    path:"richiesta/:ids",
    component:RichiesteComponent
  },
  {
    path:"class",
    component:ClasstestComponent
  }

]
@NgModule({
  declarations: [
    AppComponent,
    LottiComponent,
    RichiesteComponent,
    NavComponent,
    LottoComponent,
    ClasstestComponent,
    PanelComponent,
    RegistroComponent,
    LottoModalComponent,
    PoDirective,
    SgatelottiComponent,
    SgatereqsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    [NgbModule.forRoot()],
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [SgateService,NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents:[LottoModalComponent,SgatereqsComponent],
})
export class AppModule { }
