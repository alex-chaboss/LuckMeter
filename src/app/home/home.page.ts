import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {LuckMeterService} from '../service/luck-meter.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {StorageService} from '../service/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('luckChange', [
      state('low', style({
        background: 'linear-gradient(-45deg, #c1f800, #0a00ff, #c59fbb, #3c0a16)',
        backgroundSize: '400% 400%',
        backgroundPosition: '0% 0%'
      })),
      state('middle', style({
        background: 'linear-gradient(-45deg, #c1f800, #0a00ff, #c59fbb, #3c0a16)',
        backgroundSize: '400% 400%',
        backgroundPosition: '0% 50%'
      })),
      state('major', style({
        background: 'linear-gradient(-45deg, #c1f800, #0a00ff, #c59fbb, #3c0a16)',
        backgroundSize: '400% 400%',
        backgroundPosition: '50% 0%'
      })),
      state('height', style({
        background: 'linear-gradient(-45deg, #c1f800, #0a00ff, #c59fbb, #3c0a16)',
        backgroundSize: '400% 400%',
        backgroundPosition: '100% 100%'
      })),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
    trigger('spiner1', [
      state('stop', style({
      })),
      state('start', style({
      })),
      transition('stop => start', [
        animate('4s')
      ]),
    ]),
    trigger('spiner2', []),
    trigger('spiner3', []),
    trigger('spiner4', [])
  ],
})
export class HomePage implements OnInit, OnDestroy {

  public currentLuck = {
    average: 0,
    percent: 0.01
  };
  public accuracy = 10;   // default: 1000
  public mainColor = 'white';

  public spinerFlag = false;
  public animationState = 'low';

  autoreloadInterval: any;

  private firstComeToHomeSub;

  constructor(private luck: LuckMeterService,
              private store: StorageService,
              private eleRef: ElementRef) {
    this.check();
  }

  ngOnInit(): void {
    this.firstComeToHomeSub = this.store.homeInfoEvent.subscribe((res) => {
      if (!res) {
        this.store.setInformStatus('home-instruction');
      } else {
        this.firstComeToHomeSub.unsubscribe();
      }
    });
    this.store.getHoneInfo();
  }

  check() {
    this.spinerFlag = true;
    this.currentLuck = this.luck.calc(this.accuracy);
    this.mainColor = this.currentLuck.percent >= 50 ? 'green' : 'red';

    if (this.currentLuck.percent < 25) {
      this.animationState = 'low';
    } else if (this.currentLuck.percent >= 25 && this.currentLuck.percent < 50) {
      this.animationState = 'middle';
    } else if (this.currentLuck.percent >= 50 && this.currentLuck.percent < 75) {
      this.animationState = 'major';
    } else {
      this.animationState = 'height';
    }
  }

  startAutoreload() {
    if (this.autoreloadInterval) {
      clearInterval(this.autoreloadInterval);
    }
    this.check();
    this.autoreloadInterval = setInterval(() => this.check(), 3000);
  }

  stopAutoreload() {
    if (this.autoreloadInterval) {
      clearInterval(this.autoreloadInterval);
    }
  }

  ngOnDestroy(): void {
    this.firstComeToHomeSub.unsubscribe();
  }
}
