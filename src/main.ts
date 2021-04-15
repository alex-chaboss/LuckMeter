import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// tslint:disable-next-line
document.write('<script src="https://www.paypal.com/sdk/js?client-id=' + environment.clientId + '&vault=true&intent=subscription"></script>');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
