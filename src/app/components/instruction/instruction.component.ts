import {Component, ElementRef, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss'],
})
export class InstructionComponent implements OnInit, OnDestroy {

  @Input() position: any = {};
  @Input() size: any = {};
  @Input() side;
  @Input() infoText = 'This part no need to explain.';

  @Output() closeEvent = new EventEmitter<boolean>();

  @Input() set el(data: any) {
    if (data) {
      this.rectEl = document.getElementById('highlight');
      const rect = data.getBoundingClientRect();
      this.position = {
        top: rect.top + 'px',
        left: rect.left + 'px',
      };

      this.size = {
        w: rect.width + 'px',
        h: rect.height + 'px'
      };
    }

    if (this.position.top && this.position.left && this.size.w && this.size.h) {
      this.presentPopover({target: this.rectEl});
    }
  }

  private rectEl;

  constructor(private eleRef: ElementRef, public popoverController: PopoverController) {
  }

  ngOnInit(): void {
  }

  async presentPopover(ev: any) {
    const popover: any = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'popover-style',
      event: ev,
      translucent: true,
      showBackdrop: false,
      animated: true,
      componentProps: {mainText: this.infoText}
    });
    popover.onWillDismiss().then(() => this.close());
    return await popover.present();
  }

  close(ev?) {
    this.closeEvent.emit(true);
  }

  ngOnDestroy(): void {
  }
}
