import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {HeaderComponentComponent} from './app/components/header-component/header-component.component'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(HeaderComponentComponent, appConfig)
  .catch((err) => console.error(err));

