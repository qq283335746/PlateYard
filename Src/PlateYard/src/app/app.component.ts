import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DbProvider } from '../providers/db-provider';
import { UsersProvider } from '../providers/users-provider';
import { CommonProvider } from '../providers/common-provider';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = "";
    backButtonPressed: boolean = false;

    @ViewChild(Nav) nav: Nav;
    constructor(public platform: Platform, public commonProvider: CommonProvider, dbProvider: DbProvider, usersProvider: UsersProvider) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();

            this.actionRegister();

            if (!usersProvider.loginInfo) this.rootPage = LoginPage;
            else {
                this.rootPage = TabsPage;
            }
        });
    }

    private actionRegister() {
        this.platform.registerBackButtonAction((): any => {
            let activeVC = this.nav.getActive();
            let page = activeVC.instance;
            if (!(page instanceof TabsPage)) {
                if (!this.nav.canGoBack()) {
                    return this.showExit();
                }
            }
        }, 101);
    }

    private showExit() {
        if (this.backButtonPressed) this.platform.exitApp();
        else {
            this.commonProvider.showToast("再按一次离开","top");
            this.backButtonPressed = true;
            setTimeout(() => {
                    this.backButtonPressed = false;
            },2000);
        }
    }
}
