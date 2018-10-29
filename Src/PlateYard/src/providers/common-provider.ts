import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class CommonProvider {

    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) {
        console.log('Hello common_provider Provider');
    }

    showAlert(title: string, message: string) {
        if (!title || title === "") title = "提示";
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ["确定"]
        });
        alert.present();
    }

    showToast(message: string, position: string) {
        if (position === "") position = "middle";
        const toast = this.toastCtrl.create({
            position: position,
            message: message,
            duration: 1000
        });
        toast.present();
    }

    showConfirm(title: string, message: string, onOkCallback: Function) {
        if (!title || title === "") title = "提示";
        const alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: "取消",
                    handler: () => {
                    }
                },
                {
                    text: "确定",
                    handler: () => {
                        onOkCallback();
                    }
                }
            ]
        });
        alert.present();
    }

    formatDate(time: any){
        const date = new Date(time);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return year + "-" + month + "-" + day;
    }
}
