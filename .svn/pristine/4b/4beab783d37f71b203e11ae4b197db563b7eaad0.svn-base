import { Injectable } from '@angular/core';
import { DbProvider } from '../providers/db-provider';

@Injectable()
export class UsersProvider {

    public loginInfo: any;
    private _db;
    private _dbProvider;
    private _users;
    private tableName: string = 'Users';

    constructor(private dbProvider: DbProvider) {
        //console.log('Hello user_provider Provider');
        this._dbProvider = dbProvider;
        this._db = dbProvider.DbContext;
    }

    getAll() {
        return this._dbProvider.getAllByTableName(this.tableName);
    }

    validateUser(account: string, password: string) {
        if (this.loginInfo) return true;
        let datas = this.getAll();
        for (let item of datas) {
            if (item.Account === account && item.Password === password) {
                this.loginInfo = item;
                return true;
            }
        }
        return false;
    }

    isExistAccount(account: string) {
        let datas = this.getAll();
        for (let item of datas) {
            if (item.Account === account) {
                return true;
            }
        }
        return false;
    }

    loginOut() {
        this.loginInfo = null;
    }

    insert(userInfo) {
        userInfo.TableName = this.tableName;
        return this._db.post(userInfo);
    }

    update(userInfo) {
        userInfo.TableName = this.tableName;
        return this._db.put(userInfo);
    }
}
