import { Component  } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonProvider } from '../../providers/common-provider';
import { StockyardProvider } from '../../providers/stockyards-provider';
import { StockyardProductsProvider } from '../../providers/stockyardProducts-provider';
import { UsersProvider } from '../../providers/users-provider';
import { OperationsProvider } from '../../providers/operations-provider';

@Component({
    selector: 'page-stockyardDetail',
    templateUrl: 'stockyardDetail.html'
})
export class StockyardDetailPage {

    barcode: string;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private usersProvider: UsersProvider, private stockyardProvider: StockyardProvider, private stockyardProductsProvider: StockyardProductsProvider, private operationsProvider: OperationsProvider, private commonProvider: CommonProvider) { }

    ionViewDidLoad() {
        this.barcode = this.navParams.get('barcode');
    }

    stockyardFm = this.formBuilder.group({
        'stockyardName': ['', [Validators.required, Validators.minLength(1)]]
    });

    onCloseView() {
        this.viewCtrl.dismiss();
    }

    onSave(fmData) {
        let sName = fmData.stockyardName;
        let oldStockyardInfo: any = this.stockyardProvider.findStockyard(sName);
        if (!oldStockyardInfo) {
            const stockyardInfo = {
                Name: sName,
                Date: this.commonProvider.formatDate(new Date().getTime())
            };
            this.stockyardProvider.insert(stockyardInfo);
        }
        const stockyardProductInfo = {
            ParentName: sName,
            Barcode: this.barcode,
            Date: this.commonProvider.formatDate(new Date().getTime())
        };
        this.stockyardProductsProvider.insert(stockyardProductInfo);
        this.commonProvider.showToast("操作成功！","");

        this.onCloseView();
    }
}
