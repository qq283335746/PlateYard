import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform, ModalController, AlertController } from 'ionic-angular';
import { ZBar, ZBarOptions } from 'ionic-native';
import { CommonProvider } from '../../providers/common-provider';
import { StockyardProvider } from '../../providers/stockyards-provider';
import { StockyardProductsProvider } from '../../providers/stockyardProducts-provider';
import { StockyardDetailPage } from '../stockyardDetail/stockyardDetail';
import { StockyardProductPage } from '../stockyardProduct/stockyardProduct';

@Component({
    selector: 'page-stockyard',
    templateUrl: 'stockyard.html',
    providers: [ZBar]
})

export class StockyardPage {

    stockyards: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private zone: NgZone, private modalCtrl: ModalController, public alertCtrl: AlertController, private zbar: ZBar, private stockyardProvider: StockyardProvider, private stockyardProductsProvider: StockyardProductsProvider, private commonProvider: CommonProvider) { }

    ionViewDidLoad() {
        this.load();
    }

    load() {
        let datas = this.stockyardProvider.getAll();
        this.stockyards = this.getStockyards(datas);
    }

    getStockyards(datas) {
        let stockyardDatas: any = [];
        for (let item of datas) {
            //console.log('getStockyards-item--' + item.Name);
            let stockyardProducts: any = this.stockyardProductsProvider.getStockyardProducts(item.Name);
            //console.log('getStockyards-stockyardProducts--' + stockyardProducts);
            let totalProduct = stockyardProducts ? stockyardProducts.length : 0;
            stockyardDatas.push({
                Name: item.Name,
                TotalProduct: totalProduct
            });
        }
        return stockyardDatas;
    }

    showDetail(barcode) {
        const modal = this.modalCtrl.create(StockyardDetailPage, { barcode: barcode });
        modal.onDidDismiss(data => {
            this.load();
        });
        modal.present();
    }

    showProduct(stockyard) {
        const modal = this.modalCtrl.create(StockyardProductPage, { stockyard: stockyard });
        modal.onDidDismiss(data => {
            this.load();
        });
        modal.present();
    }

    onScan() {
        const options: ZBarOptions = {
            flash: 'off',
            drawSight: true,
            text_title: '扫一扫',
            text_instructions: '请将二维码置于红线中央'
        };
        ZBar.scan(options).then(result => {
            this.showDetail(result);
        });
    }

}
