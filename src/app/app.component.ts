import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProductPage } from '../pages/product/product';
import { TabsPage } from '../pages/tabs/tabs';
import { Tab2Page } from '../pages/tab2/tab2'
import { SpecialPage } from '../pages/special/special'

import { SharedDataProvider } from '../providers/shared-data/shared-data';
import { TranslateService } from '@ngx-translate/core';
import { ConfigProvider } from '../providers/config/config';

export interface PageInterface {
  title: string;
  component?: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;
  // rootPage:any = LoginPage;
  pages: PageInterface[] = [
    { title: 'Shop', component: TabsPage, icon: 'home' },
    { title: 'Tab 2', component: Tab2Page, icon: 'contacts' },
    { title: 'Special', component: SpecialPage, icon: 'shuffle' },
  ];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public shared: SharedDataProvider,
    public translate: TranslateService,
    public config: ConfigProvider) {
    platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // this.platform.setDir(localStorage.direction, true);
    // shared.dir = localStorage.direction;
    //setting default languge on start up 
    // console.log('url : ' + this.config.url + "appLabels3?lang=" + this.config.langId);
    //  translate.setDefaultLang(this.config.url + "appLabels3?lang=" + this.config.langId);
    //  translate.setDefaultLang('zh');
    translate.setDefaultLang('zh');
    translate.use('zh');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

