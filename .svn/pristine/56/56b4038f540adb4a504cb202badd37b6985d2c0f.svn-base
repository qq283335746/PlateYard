import { Injectable } from '@angular/core';
import { DbProvider } from '../providers/db-provider';

@Injectable()
export class StockyardProvider {

    private _db;
    private _dbProvider;
    //Stockyards:any=[];
    tableName: string = 'Stockyards';

    constructor(dbProvider: DbProvider) {
        //console.log('Hello stockyard_provider Provider');
        this._dbProvider = dbProvider;
        this._db = dbProvider.DbContext;
    }

    getAll() {
        return this._dbProvider.getAllByTableName(this.tableName);
    }

    findStockyard(name) {
        let datas = this.getAll();
        for (let item of datas) {
            if (item.Name === name) return item;
        }
        return null;
    }

    insert(stockyardInfo) {
        stockyardInfo.TableName = this.tableName;
        return this._db.post(stockyardInfo);
    }

    update(stockyardInfo) {
        stockyardInfo.TableName = this.tableName;
        return this._db.put(stockyardInfo);
    }

    delete(stockyardInfo) {
        return this._db.remove(stockyardInfo);
    }
}
