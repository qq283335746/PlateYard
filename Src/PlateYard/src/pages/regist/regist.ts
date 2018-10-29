import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users-provider';
import { CommonProvider } from '../../providers/common-provider';

import { LoginPage } from '../login/login';

@Component({
    selector: 'page-regist',
    templateUrl: 'regist.html'
})
export class RegistPage {

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private usersProvider: UsersProvider,
        private commonProvider: CommonProvider) {
        
    }

    ionViewDidLoad() {
    }

    registFm = this.formBuilder.group({
        'Account': ['', [Validators.required, Validators.minLength(2)]],
        'Password': ['', [Validators.required, Validators.minLength(6)]]
    });

    onLogin() {
        this.navCtrl.setRoot(LoginPage);
    }

    onSignup(fmData) {
        const isExistAccount = this.usersProvider.isExistAccount(fmData.Account);
        if (isExistAccount) {
            this.commonProvider.showAlert("提示","当前账号已注册，请更换一个再重试！");
            return;
        }
        const userInfo = { Account: fmData.Account, Password: fmData.Password, Date: this.commonProvider.formatDate(new Date().getTime()) };
        this.usersProvider.insert(userInfo);

        this.commonProvider.showToast("注册成功，请登录！", "top");
        this.navCtrl.push(LoginPage);
    }
}
