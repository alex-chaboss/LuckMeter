import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {SpinerComponent} from './spiner.component';
import {PaypalService} from '../../service/paypal.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // BrowserModule,
    // BrowserAnimationsModule
  ],
  exports: [
    SpinerComponent
  ],
  entryComponents: [SpinerComponent],
  declarations: [SpinerComponent],
  providers: [PaypalService]
})
export class SpinerModule {}
