import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { DbProvider } from '../providers/db-provider';
import { UsersProvider } from '../providers/users-provider';
import { OperationsProvider } from '../providers/operations-provider';
import { StockyardProvider } from '../providers/stockyards-provider';
import { StockyardProductsProvider } from '../providers/stockyardProducts-provider';
import { CommonProvider } from '../providers/common-provider';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistPage } from '../pages/regist/regist';
import { OperationPage } from '../pages/operation/operation';
import { PersonalPage } from '../pages/personal/personal';
import { StockyardPage } from '../pages/stockyard/stockyard';
import { StockyardDetailPage } from '../pages/stockyardDetail/stockyardDetail';
import { StockyardProductPage } from '../pages/stockyardProduct/stockyardProduct';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistPage,
    OperationPage,
    PersonalPage,
    StockyardPage,
      StockyardDetailPage,
      StockyardProductPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistPage,
    OperationPage,
    PersonalPage,
    StockyardPage,
      StockyardDetailPage,
      StockyardProductPage
  ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DbProvider, UsersProvider, OperationsProvider, StockyardProvider, StockyardProductsProvider, CommonProvider]
})
export class AppModule {}
