import {Component, ElementRef, HostListener, OnInit, Input, OnDestroy} from '@angular/core';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [
  ],
})
export class PopoverComponent implements OnInit, OnDestroy {

  @Input() public mainText;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
