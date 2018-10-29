import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OperationsProvider } from '../../providers/operations-provider';

@Component({
    selector: 'page-operation',
    templateUrl: 'operation.html'
})

export class OperationPage {

    operations: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone, private operationsProvider: OperationsProvider) { }

    ionViewDidEnter() {
        this.operations = this.operationsProvider.getAll();
    }

}
