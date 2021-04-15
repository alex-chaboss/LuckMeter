import {Component, ElementRef, HostListener, OnInit, Input, OnDestroy} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss'],
  animations: [
    trigger('spiner', [
      state('back', style({
        opacity: '0',
      })),
      state('front', style({
        opacity: '1',
        color: 'black',
        textShadow: '2px 2px 8px #0a204a'
      })),
      state('win', style({
        color: '#006700',
        textShadow: '2px 2px 8px #dff9b6'
      })),
      state('lose', style({
        color: 'red',
        textShadow: '2px 2px 8px #f1dfe5'
      })),
      transition('back => front', [
        animate('0s')
      ]),
      transition('* => back', [
        animate('0s')
      ]),
      transition('front => win', [
        animate('0.5s')
      ]),
      transition('front => lose', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class SpinerComponent implements OnInit, OnDestroy {

  private currentDeg = 0;
  public items: any = [];
  public tz = 200;
  private rotateDegree = 60;
  public innerWidth = 0;
  public count = 0;
  public itemWidthLimit = 15;
  public contentWidth = 120;
  public carouselItemPart = 40;
  private tzItem = 35;
  private spinerFlag = false;

  public isHide = true;
  public isColorSet = false;
  public colorAnimation = 'win';

  percent = 0.0;

  public slots = [0, 1, 2, 3, 4];

  rotar = 1800;

  recallStyleTimeout = [0, 0, 0, 0, 0];
  finishSpinerTimeout = [0, 0, 0, 0, 0];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  @Input() set currentLuck(values: number) {
    // if ()
    this.percent = values;


    const SLOT_1 = Number(this.getSpinNumber(0)) * this.rotateDegree;
    const SLOT_2 = Number(this.getSpinNumber(1)) * this.rotateDegree;
    const SLOT_3 = Number(this.getSpinNumber(3)) * this.rotateDegree;
    const SLOT_4 = Number(this.getSpinNumber(4)) * this.rotateDegree;

    if (this.spinerFlag) {
      this.applyStyle(0, SLOT_1);
      this.applyStyle(1, SLOT_2);
      this.applyStyle(3, SLOT_3);
      this.applyStyle(4, SLOT_4);
    } else {
      this.applyStyle(0, this.rotar + SLOT_1);
      this.applyStyle(1, (-1) * this.rotar + SLOT_2);
      this.applyStyle(3, this.rotar + SLOT_3);
      this.applyStyle(4, (-1) * this.rotar + SLOT_4);
    }

    this.spinerFlag = !this.spinerFlag;
  }

  constructor(private eleRef: ElementRef) {
    this.initItems();
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  getSpinNumber(n) {
    const p = this.percent;
    if (p < 0.01) {
      return '00.01'[n];
    } else if (p.toFixed(2).length === 5) {
      return String(p.toFixed(2))[n];
    } else if (p >= 10 && p.toFixed(2).length < 5) {
      return String(p.toFixed(2) + '0')[n];
    } else if (p < 10 && p.toFixed(2).length === 4) {
      return String('0' + p.toFixed(2))[n];
    } else if (p < 10 && p.toFixed(2).length === 3) {
      return String('0' + p.toFixed(2) + '0')[n];
    }
  }

  initItems() {
    const values: any [] = [];
    for (let i = 0; i < 10; i++) {
      values.push(i);
    }
    let degree = 0;

    this.rotateDegree = 360 / values.length;

    this.tz = this.tzItem * values.length;
    this.count = values.length;
    if (this.carouselItemPart * this.count < this.itemWidthLimit) {
      this.carouselItemPart = this.itemWidthLimit / this.count;
    }
    this.items = values.map((item: any, index: number) => {
      const slideItem = {
        idx: index,
        bgColor: 'transparent',
        currentPlacement: degree
      };
      degree = degree - this.rotateDegree;
      return slideItem;
    });
  }

  private applyStyle(pos, deg) {
    if(this.recallStyleTimeout[pos]) clearTimeout(this.recallStyleTimeout[pos]);
    if(this.finishSpinerTimeout[pos]) clearTimeout(this.finishSpinerTimeout[pos]);

    const docs: any = document.getElementsByClassName('spiner');

    const ele = docs[pos];

    if (ele) {
      this.isHide = true;
      this.isColorSet = false;
      ele.style['-webkit-transform'] = 'rotateX(' + deg + 'deg) ';
      ele.style['-moz-transform'] = 'rotateX(' + deg + 'deg) ';
      ele.style['-o-transform'] = 'rotateX(' + deg + 'deg) ';
      ele.style['transform'] = 'rotateX(' + deg + 'deg) ';

      this.colorAnimation = this.percent < 50 ? 'lose' : 'win';

      this.finishSpinerTimeout[pos] = setTimeout(() => {
        this.isHide = false;
        this.isColorSet = true;
      }, 1800);
    } else {
      this.recallStyleTimeout[pos] = setTimeout(() => this.applyStyle(pos, deg), 500);
    }
  }

  isFront(item, spiner): boolean {
    return Number(this.getSpinNumber(spiner)) === item;
  }

  cleanAllTimeouts() {
    for (let p = 0; p < this.recallStyleTimeout.length; p++) {
      if (this.recallStyleTimeout[p]) {
        clearTimeout(this.recallStyleTimeout[p]);
      }
      if (this.finishSpinerTimeout[p]) {
        clearTimeout(this.finishSpinerTimeout[p]);
      }
    }
  }

  ngOnDestroy(): void {
    this.cleanAllTimeouts();
  }
}
