import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public baseData = [];
  public todayData = []; // !!!??? 86400 large data
  public maxToday = 0;
  public minToday = 100;
  public avarageToday = 0;
  public baseLimit = 100;
  public labelsList = [];

  public baseDataEvent = new Subject();
  public maxMinEvent = new Subject();
  public limitEvent = new Subject();
  public karmaEvent = new Subject();
  public informStatusEvent = new Subject();
  public homeInfoEvent = new Subject();
  public historyInfoEvent = new Subject();

  public karma = 0.5;  // this is a weight which can will shift percentage from one side to other. 0.5 - is a middle

  public informStatus = 'waiting';  // inform on a first connection
  public homeInfo = false;  // inform on a first connection
  public historyInfo = false;  // inform on a first connection

  constructor(private storage: Storage) {
    console.log('------------- Initialize data and params ------------');
  }

  getBaseList() {
    this.storage.get('baseData').then(getres => {
      if (getres) {
        if (getres.baseData) {
          this.baseData = getres.baseData;
        }
        if (getres.labels) {
          this.labelsList = getres.labels;
        }
      }
      this.baseDataEvent.next(true);
    });
  }

  getMaxMin() {
    this.storage.get('maxMin').then(getres => {
      if (getres) {
        if (getres.max) {
          this.maxToday = getres.max;
        }
        if (getres.min) {
          this.minToday = getres.min;
        }
        if (getres.avarage) {
          this.avarageToday = getres.avarage;
        }
      }
      this.maxMinEvent.next(true);
    });
  }

  getLimit() {
    this.storage.get('limit').then(getres => {
      if (getres) {
        this.baseLimit = getres;
      }
      this.limitEvent.next(true);
    });
  }

  setBaseList(baseData, labels) {
    this.baseData = baseData;
    this.labelsList = labels;
    this.storage.set('baseData', {baseData, labels}).then(setres => {
    });
  }

  setMaxMin(max, min, average) {
    this.maxToday = max;
    this.minToday = min;
    this.avarageToday = average;
    this.storage.set('maxMin', {max, min, average}).then(setres => {
    });
  }

  setLimit(limit) {
    this.baseLimit = limit;
    this.storage.set('limit', limit).then(setres => {
    });
  }

  setTermsOfUse(data) {
    this.storage.set('TermsOfUse', data).then(setres => {
    });
  }

  getKarmaLevel() {
    this.storage.get('karmaLevel').then(getres => {
      if (getres && Number(getres) > 0.5) {
        this.karma = Number(getres);
        this.karmaEvent.next(this.karma);
      }
    });
  }

  setKarmaLevel(karma: number) {
    if (karma && karma > this.karma) {
      this.karma = karma;
    }
    this.storage.set('karmaLevel', karma).then(setres => {
    });
    this.karmaEvent.next(this.karma);
  }

  getInformStatus() {
    this.storage.get('informStatus').then(getres => {
      this.informStatus = getres ? getres : 'start';
      this.informStatusEvent.next(this.informStatus);
    });
  }

  setInformStatus(data: string) {
    this.storage.set('informStatus', data).then(setres => {
    });
    this.informStatusEvent.next(data);
  }

  getHoneInfo() {
    this.storage.get('homeInfo').then(getres => {
      this.homeInfo = getres;
      this.homeInfoEvent.next(this.homeInfo);
    });
  }

  setHomeInfo(data: boolean) {
    this.storage.set('homeInfo', data).then(setres => {
    });
    this.homeInfoEvent.next(data);
  }

  getHistoryInfo() {
    this.storage.get('historyInfo').then(getres => {
      this.historyInfo = getres;
      this.historyInfoEvent.next(this.historyInfo);
    });
  }

  setHistoryInfo(data: boolean) {
    this.storage.set('historyInfo', data).then(setres => {
    });
    this.historyInfoEvent.next(data);
  }

}
