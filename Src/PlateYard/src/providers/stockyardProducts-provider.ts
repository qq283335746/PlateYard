import { Injectable } from '@angular/core';
import { DbProvider } from '../providers/db-provider';

@Injectable()
export class StockyardProductsProvider {

    private _db;
    private _dbProvider;
    private _stockyardProducts;
    private tableName: string = 'StockyardProducts';

    constructor(dbProvider: DbProvider) {
        //console.log('Hello stockyardProducts_provider Provider');
        this._dbProvider = dbProvider;
        this._db = dbProvider.DbContext;
    }

    getAll() {
        return this._dbProvider.getAllByTableName(this.tableName);
    }

    getStockyardProducts(parentName: string) {
        let datas = this.getAll(); 
        let stockyardProducts: any = [];
        let index = 0;
        for (let item of datas) {
            if (item.ParentName === parentName && item._deleted != true) {
                index++;
                item.Index = index;
                stockyardProducts.push(item);
            }
        }
        //console.log('getStockyardProducts--' + JSON.stringify(stockyardProducts));
        return stockyardProducts;
    }

    getStockyardProductInfo(id) {
        return this._dbProvider.getOneInfo(id);
    }

    insert(stockyardProductInfo) {
        stockyardProductInfo.TableName = this.tableName;
        return this._db.post(stockyardProductInfo);
    }

    update(stockyardProductInfo) {
        stockyardProductInfo.TableName = this.tableName;
        return this._db.put(stockyardProductInfo);
    }

    delete(id) {
        let oldInfo = this._dbProvider.getOneInfo(id);
        if (!oldInfo) return null;
        return this._db.remove(oldInfo);
    }
}
