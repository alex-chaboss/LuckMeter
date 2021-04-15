import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {PaypalComponentModule} from '../components/paypal/paypal.module';
import {SpinerModule} from '../components/spiner/spiner.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalComponentModule,
    SpinerModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
