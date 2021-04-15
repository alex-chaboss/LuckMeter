import {Component, OnInit} from '@angular/core';
import {StorageService} from '../service/storage.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private store: StorageService, private navCtrl: NavController) {
  }

  ngOnInit() {
  }

  goToHome() {
    this.store.setTermsOfUse(true);
    this.navCtrl.navigateRoot('home');
  }

}
