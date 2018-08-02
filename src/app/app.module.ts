import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Device } from '@ionic-native/device';
// import { SlidingTabsComponent } from '../components/sliding-tabs/sliding-tabs';


//Page

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs'
import { ProductPage } from '../pages/product/product'
import { Tab2Page } from '../pages/tab2/tab2'
import { SpecialPage } from '../pages/special/special'
import { LoginPage } from '../pages/login/login';

//Provide
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ConfigProvider } from '../providers/config/config';
import { createTranslateLoader } from '../providers/translate/translate';
import { LoadingProvider } from '../providers/loading/loading';
import { SharedDataProvider } from '../providers/shared-data/shared-data';

// Components
import { ProductComponent } from '../components/product/product';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProductPage,
    Tab2Page,
    SpecialPage,
    ProductComponent
    // SlidingTabsComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    LazyLoadImageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProductPage,
    Tab2Page,
    SpecialPage,
    ProductComponent
    // SlidingTabsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConfigProvider,
    LocalNotifications,
    LoadingProvider,
    SharedDataProvider,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
