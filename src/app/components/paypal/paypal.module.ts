import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {PaypalComponent} from './paypal.component';
import {PaypalService} from '../../service/paypal.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    PaypalComponent
  ],
  declarations: [PaypalComponent],
  providers: [PaypalService]
})
export class PaypalComponentModule {}
