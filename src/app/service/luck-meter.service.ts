import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LuckMeterService {

  private center = 512354;
  public interval = 3000;
  public range = 1000000;

  constructor(private store: StorageService) {}

  public calc(count) {
    const all = [];
    let average = 0;
    let percent = 0;
    const upper = [];
    const lower = [];

    for (let i = 0; i < count; i++) {
      const n = this.getRandom();
      if (typeof n === 'number') {
        const close = Math.abs(n - this.center);
        const border = this.range * this.store.karma;
        if (close >= border) {
          percent = 0;
          all.push(0);
        } else {
          percent = 100 - close / border * 100;
          all.push(percent);
        }
      }
    }
    const a = this.getAverage(all);
    if (typeof a === 'number') {
      average = a;
    }
    return {average, all, percent, upper, lower};
  }

  public setCenter(num) {
    if (typeof num === 'number') {
      this.center = num;
      return 'ok';
    } else if (!num) {
      this.center = this.rnd();
      return 'ok';
    } else {
      return 'It is not a number!';
    }
  }

  public getCenter() {
    return this.center;
  }

  private getRandom() {
    if (this.center === 0) {
      return 'Center not set';
    }
    return this.rnd();
  }

  private rnd(): number {
    return Math.random() * this.range;
  }

  private getAverage(list: any[]) {
    let avr = 0;
    if (list.length > 0) {
      for (let val of list) {
        avr += Math.abs(val);
      }
      return avr / list.length;
    } else {
      return 'List is empty';
    }
  }

}
