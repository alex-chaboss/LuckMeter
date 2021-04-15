import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private storage: Storage
  ) {
  }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve) => {

      this.storage.get('TermsOfUse').then(getres => {
        if (getres) {
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('start');
          return resolve(false);
        }
      });

    });
  }
}
