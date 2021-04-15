import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LuckMeterService} from './service/luck-meter.service';
import {environment} from '../environments/environment';
import {StorageService} from './service/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      img: ''
    },
    {
      title: 'History',
      url: '/history',
      icon: 'pulse',
      img: ''
    },
    // {
    //   title: 'About',
    //   url: '/about-us',
    //   icon: '',
    //   img: 'information-circle-outline.svg'
    // }
  ];

  instructionShow = false;
  instructionType = '';
  instructionStep = 0;

  public instructionEl;
  private currentInfoText = '';

  private repeatCount = 0;

  // TODO: should be in other service
  private instructionList = {
    'home-instruction': [
      'Main menu which you can use to switch between pages.',
      'Settings to switch between automatic retry and retry by click (automatic scroll every 3 sec)',
      'Info about getting luck. Accuracy - retry count, Average - average between all retries.',
      'Your current luck',
      'Press to one more check your luck)',
      'Or press here to make the same.',
      'Your Karma level. Your luck depends from your Karma. When you donate to develop you have rise up your Karma.',
      'Current Karma price.',
      'Tap to select amount of donation.',
    ],
    'history-instruction': [
      ''
    ]
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private luck: LuckMeterService,
    private store: StorageService,
  ) {
    this.initializeApp();
    this.luck.setCenter(false);
    setInterval(() => this.luck.setCenter(false), environment.CENTER_INTERVAL_CHANGE);

    this.store.informStatusEvent.subscribe((res: string) => {
      this.instructionType = res ? res : '';
      if ((res === 'home-instruction' || res === 'history-instruction')) {
        this.startInstruction();
      }
    });
  }

  ngOnInit(): void {
  }

  startInstruction() {
    this.currentInfoText = this.instructionList[this.instructionType][this.instructionStep];
    this.instructionEl = document.getElementById(this.instructionType + '-' + this.instructionStep);
    if (!this.instructionEl) {
      if (this.repeatCount > 10) {
        return;
      }
      this.repeatCount++;
      return setTimeout(() => this.startInstruction(), 500);
    }
    this.repeatCount = 100;
    this.instructionStep++;
    this.instructionShow = true;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeInstruction() {
    this.instructionShow = false;
    if (this.instructionList[this.instructionType] && this.instructionStep < this.instructionList[this.instructionType].length) {
      this.startInstruction();
    } else {
      this.instructionStep = 0;
      this.repeatCount = 0;

      if (this.instructionType === 'home-instruction') {
        this.store.setHomeInfo(true);
      }
      if (this.instructionType === 'history-instruction') {
        this.store.setHistoryInfo(true);
      }

      this.store.setInformStatus('finished');
    }
  }


}
