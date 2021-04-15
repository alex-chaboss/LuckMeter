import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HistoryPage } from './history.page';
import {PaypalComponentModule} from '../components/paypal/paypal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HistoryPage
      }
    ])
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
