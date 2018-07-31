//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ConfigProvider } from '../config/config';

export function createTranslateLoader(http: HttpClient, config: ConfigProvider) {
  
  return new TranslateHttpLoader(http, 'http://ionicecommerce.com/laravel/'+'appLabels3?lang=',"");
 
}