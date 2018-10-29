import { Component, NgZone } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common-provider';
import { DbProvider } from '../../providers/db-provider';
import { StockyardProvider } from '../../providers/stockyards-provider';
import { StockyardProductsProvider } from '../../providers/stockyardProducts-provider';
import { UsersProvider } from '../../providers/users-provider';
import { OperationsProvider } from '../../providers/operations-provider';

@Component({
    selector: 'page-stockyardProduct',
    templateUrl: 'stockyardProduct.html'
})
export class StockyardProductPage {

    stockyardInfo: any = {};
    stockyardProducts: any = [];
    selectItem: any = {};

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private zone: NgZone, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private dbProvider:DbProvider, private usersProvider: UsersProvider, private stockyardProvider: StockyardProvider, private stockyardProductsProvider: StockyardProductsProvider, private operationsProvider: OperationsProvider, private commonProvider: CommonProvider) { }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad stockyardDetailPage');
        this.stockyardInfo = this.navParams.get('stockyard');
        //this.zone.run(() => {
        //    this.load();
        //});
        this.load();
    }

    load() {
        this.stockyardProducts = this.stockyardProductsProvider.getStockyardProducts(this.stockyardInfo.Name);
    }

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '出堆',
                    handler: () => {
                        this.commonProvider.showConfirm("", "确定要执行此操作吗？", () => {
                            this.doOuting();
                        });
                    }
                }, {
                    text: '翻堆',
                    handler: () => {
                        this.showPrompt(data => {
                            this.doTurning(data.stockyardName);
                        });
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    showPrompt(onOkCallback: Function) {
        const prompt = this.alertCtrl.create({
            title: '提示',
            message: "请输入要放置的堆场名称",
            inputs: [
                {
                    name: 'stockyardName',
                    placeholder: '请输入堆场名称'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                    }
                },
                {
                    text: '确定',
                    handler: data => {
                        if (!data || !data.stockyardName || data.stockyardName === "") {
                            //this.commonProvider.showAlert("提示", "请输入堆名！");
                            return;
                        }
                        onOkCallback(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    onRowSelected(item) {
        this.selectItem = item;
        this.presentActionSheet();
    }

    onCloseView() {
        this.viewCtrl.dismiss();
    }

    //出堆
    doOuting() {
        this.stockyardProductsProvider.delete(this.selectItem._id);

        let operationInfo = {
            User: this.usersProvider.loginInfo.Account,
            Date: this.commonProvider.formatDate(new Date().getTime()).replace("-", ""),
            Barcode: this.selectItem.Barcode,
            Content: "出堆"
        };
        this.operationsProvider.insert(operationInfo);
        this.commonProvider.showAlert('', "操作成功！");
        this.remove(this.selectItem._id);
    }

    //翻堆
    doTurning(stockyardName) {
        let sStockyardName = stockyardName;
        if (sStockyardName === this.stockyardInfo.Name) {
            this.commonProvider.showAlert("", "当前堆场为“" + this.stockyardInfo.Name + "”,翻堆只能放置在不同的堆场，请正确操作！");
            return;
        }
        if (!this.stockyardProvider.findStockyard(sStockyardName)) {
            const stockyardInfo = {
                Name: sStockyardName,
                Date: this.commonProvider.formatDate(new Date().getTime())
            };
            this.stockyardProvider.insert(stockyardInfo);
        }

        let oldStockyardProductInfo = this.stockyardProductsProvider.getStockyardProductInfo(this.selectItem._id);
        if (oldStockyardProductInfo) {
            oldStockyardProductInfo.ParentName = sStockyardName;
            this.stockyardProductsProvider.update(oldStockyardProductInfo);
        }
        else {
            const stockyardProductInfo = {
                ParentName: sStockyardName,
                Barcode: this.selectItem.Barcode,
                Date: this.commonProvider.formatDate(new Date().getTime())
            };
            this.stockyardProductsProvider.insert(stockyardProductInfo);
        }

        let operationInfo = {
            User: this.usersProvider.loginInfo.Account,
            Date: this.commonProvider.formatDate(new Date().getTime()).replace("-", ""),
            Barcode: this.selectItem.Barcode,
            Content: "翻堆"
        };
        this.operationsProvider.insert(operationInfo);
        this.commonProvider.showAlert('', "操作成功！");
        this.load();
    }

    remove(id) {
        let index = this.dbProvider.findIndex(this.stockyardProducts, id);
        let currentInfo = this.stockyardProducts[index];
        if (currentInfo) this.stockyardProducts.splice(index, 1);
    }
}
