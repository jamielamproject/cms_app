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
  // rootPage:any = TabsPage;
  rootPage:any = LoginPage;
  pages: PageInterface[] = [
    { title: 'Shop', component: TabsPage, icon: 'home' },
    { title: 'Tab 2', component: Tab2Page, icon: 'contacts' },
    { title: 'Special', component: SpecialPage, icon: 'shuffle' },
  ];

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public shared: SharedDataProvider) {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

