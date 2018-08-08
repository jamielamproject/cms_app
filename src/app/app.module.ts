import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import {HttpClientModule, HttpClient} from '@angular/common/http';

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
import { ProductDetailPage } from '../pages/product-detail/product-detail';

//Provide
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ConfigProvider } from '../providers/config/config';
import { LoadingProvider } from '../providers/loading/loading';
import { SharedDataProvider } from '../providers/shared-data/shared-data';

// Components
import { ProductComponent } from '../components/product/product';

// Library
import { CurencyPipe } from '../curency/curency';

export function createTranslateLoader(http: HttpClient) {
    // return new TranslateHttpLoader(http, '', "");
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProductPage,
    Tab2Page,
    SpecialPage,
    ProductComponent,
    CurencyPipe,
    ProductDetailPage
    // SlidingTabsComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    LazyLoadImageModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
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
    ProductComponent,
    ProductDetailPage
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
