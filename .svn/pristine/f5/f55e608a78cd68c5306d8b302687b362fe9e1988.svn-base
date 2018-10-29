import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class DbProvider {

    public DbContext;
    public AllDatas;

    constructor() {
        console.log('Hello db-provider Provider');
        this.initDb();
    }

    initDb() {
        console.log('initDb--');
        if (!this.DbContext) {
            this.DbContext = new PouchDB('PlateYardDb.db');
            this.getAll();
        }
    }

    getAllByTableName(tableName:string) {
        let allDatas = this.AllDatas;
        //console.log('getAllByTableName--'+JSON.stringify(allDatas));
        let datas: any = [];
        for (let item of allDatas) {
            if (item.TableName === tableName) {
                datas.push(item);
            }
        }

        return datas;
    }

    getOneInfo(docId) {
        let index = this.findIndex(this.AllDatas, docId);
        return this.AllDatas[index];
    }

    getAll() {
        if (!this.AllDatas) {
            return this.DbContext.allDocs({ include_docs: true })
                .then(docs => {
                    this.AllDatas = docs.rows.map(row => {
                        return row.doc;
                    });

                    this.DbContext.changes({ live: true, since: 'now', include_docs: true }).on('change', this.onDatabaseChange);

                    return this.AllDatas;
                });
        }
        else {
            return Promise.resolve(this.AllDatas);
        }
    }

    findIndex(array, id) {
        let low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid;
        }
        return low;
    }

    private onDatabaseChange = (change) => {
        let index = this.findIndex(this.AllDatas, change.id);
        let currentInfo = this.AllDatas[index];

        if (change.deleted) {
            if (currentInfo) {
                this.AllDatas.splice(index, 1); // delete
            }
        }
        else {
            if (currentInfo && currentInfo._id === change.id) {
                this.AllDatas[index] = change.doc; // update
            }
            else {
                this.AllDatas.splice(index, 0, change.doc); // insert
            }
        }
    }
}
