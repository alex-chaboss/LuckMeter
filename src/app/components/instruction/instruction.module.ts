import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {InstructionComponent} from './instruction.component';
import {PopoverModule} from '../popover/popover.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverModule
  ],
  exports: [
    InstructionComponent
  ],
  entryComponents: [InstructionComponent],
  declarations: [InstructionComponent],
})
export class InstructionModule {}
