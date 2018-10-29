import { Injectable } from '@angular/core';
import { DbProvider } from '../providers/db-provider';

@Injectable()
export class OperationsProvider {

    private _db;
    private _dbProvider;
    private _operations;
    private tableName: string = 'Operations';

    constructor(private dbProvider: DbProvider) {
        //console.log('Hello operations-provider Provider');
        this._dbProvider = dbProvider;
        this._db = dbProvider.DbContext;
    }

    getAll() {
        return this._dbProvider.getAllByTableName(this.tableName);
    }

    insert(operationInfo) {
        operationInfo.TableName = this.tableName;
        return this._db.post(operationInfo);
    }

    update(operationInfo) {
        operationInfo.TableName = this.tableName;
        return this._db.put(operationInfo);
    }
}
