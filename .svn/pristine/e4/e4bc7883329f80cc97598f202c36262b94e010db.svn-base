import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users-provider';
import { CommonProvider } from '../../providers/common-provider';

import { TabsPage } from '../tabs/tabs';
import { RegistPage } from '../regist/regist';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private usersProvider: UsersProvider, private commonProvider: CommonProvider) { }

    ionViewDidLoad() {
    }

    loginFm = this.formBuilder.group({
        'Account': ['', [Validators.required, Validators.minLength(2)]],
        'Password': ['', [Validators.required, Validators.minLength(6)]]
    });

    onSignup() {
        this.navCtrl.push(RegistPage);
    }

    onLogin(fmData) {
        if (!this.usersProvider.validateUser(fmData.Account, fmData.Password)) {
            this.commonProvider.showToast("账号或密码不正确！", "top");
            return;
        }
        this.navCtrl.setRoot(TabsPage);
    }
}
