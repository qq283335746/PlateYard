import { Component } from '@angular/core';
import { App,NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common-provider';
import { UsersProvider } from '../../providers/users-provider';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-personal',
    templateUrl: 'personal.html'
})

export class PersonalPage {

    loginInfo: any = {};

    constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private usersProvider: UsersProvider, private commonProvider: CommonProvider) {
        
    }

    ionViewDidLoad() {
        this.loginInfo = this.usersProvider.loginInfo;
    }

    onLogout() {
        this.commonProvider.showConfirm("提示", "确定要注销吗?", () => {
            this.usersProvider.loginOut();
            this.commonProvider.showToast("注销成功！", "middle");
            this.app.getRootNav().setRoot(LoginPage); 
        });
    }

}
