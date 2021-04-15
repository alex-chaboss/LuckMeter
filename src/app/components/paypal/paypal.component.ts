import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaypalService} from '../../service/paypal.service';
import {StorageService} from '../../service/storage.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import {AlertController} from '@ionic/angular';
import {environment} from '../../../environments/environment';

declare var paypal: any;


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: 'calc(30vw + 30px)',
        opacity: 0,
        backgroundColor: 'transparent'
      })),
      state('visible', style({
        height: 'calc(30vw + 30px)',
        opacity: 1,
        backgroundColor: 'transparent'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        backgroundColor: 'transparent'
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
      transition('open => visible', [
        animate('2s')
      ]),
    ]),
  ],
})
export class PaypalComponent implements OnInit {

  @ViewChild('paypalbuttoncontainer') paypalbuttoncontainer: ElementRef;

  public karmaLevel = 0.5;
  public karmaStep = 0.001;

  public visibleDonateButtons = false;

  public currentRiseUp = '';

  public animationState = 'closed';

  constructor(private pp: PaypalService,
              public alertController: AlertController,
              private store: StorageService) {
    this.karmaLevel = this.store.karma;
    this.store.karmaEvent.subscribe((res: any) => {
      this.karmaLevel = this.store.karma;
      this.karmaStep = this.countKarmaStep(this.karmaLevel).d;
    });
  }

  ngOnInit() {
    this.store.getKarmaLevel();
  }

  public countKarmaStep(kl: number) {
    if (kl < 1) {
      return {d: 0.001, step: 1};
    } else if (kl < 2) {
      return {d: 0.0001, step: 2};
    } else if (kl < 3) {
      return {d: 0.00001, step: 3};
    } else if (kl < 4) {
      return {d: 0.000001, step: 4};
    } else {
      return {d: 0.0000001, step: 5};
    }
  }

  public show() {
    if (!this.visibleDonateButtons) {
      this.removeAllChilds();
      this.animationState = 'open';
      setTimeout(() => (this.animationState = 'visible'), 1000);
    } else {
      this.animationState = 'closed';
    }

    this.visibleDonateButtons = !this.visibleDonateButtons;
  }

  public async donate(amount) {

    this.currentRiseUp = amount + '$';

    paypal.Buttons({
      createSubscription: (data, actions) => {
        let planName = environment.plans[0];

        switch (amount) {
          case 1:
            planName = environment.plans[0];
            break;
          case 10:
            planName = environment.plans[1];
            break;
          case 50:
            planName = environment.plans[2];
            break;
          case 200:
            planName = environment.plans[3];
            break;
          case 1000:
            planName = environment.plans[4];
            break;
        }

        return actions.subscription.create({
          'plan_id': planName
        });
      },
      onApprove: (data, actions) => {
        const newKarmaLevel = this.getNewKarmaLevel(Number(amount));
        this.store.setKarmaLevel(newKarmaLevel);   // default: this.karmaLevel + Number(amount) / 1000
        this.presentAlert(String(newKarmaLevel));
        this.removeAllChilds();
      }
    }).render('#paypal-button-container');
  }

  async presentAlert(k) {
    const alert = await this.alertController.create({
      header: 'Donation alert',
      subHeader: 'Thank you!',
      message: 'Congratulations, you Karma upped to ' + k,
      buttons: ['OK']
    });

    await alert.present();
  }


  getNewKarmaLevel(amount: number, ckl?: number): number {
    const currentKarmaLevel = ckl ? ckl : this.karmaLevel;
    const k = this.countKarmaStep(currentKarmaLevel);
    const dl = 1 / k.d;

    if ((currentKarmaLevel + amount / dl) < k.step || k.step === 5) {
      return (currentKarmaLevel + amount / dl);
    } else {
      const newAmount = amount - ((k.step - currentKarmaLevel) * dl);
      return this.getNewKarmaLevel(newAmount, k.step);
    }
  }

  removeAllChilds() {
    this.currentRiseUp = '';
    const myNode = document.getElementById('paypal-button-container');
    myNode.innerHTML = '';
  }

}
