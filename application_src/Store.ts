/// <reference path="../typings/index.d.ts" />

import { EventEmitter } from 'events'
import { records } from './productsdb.js'

console.log(records);


export interface Product {
  UnitPrice: number,
  ProductID: number,
  UnitsInStock: number,
  ProductName: string
}

export class Store  {

  private emitter
  private _records
  public loading

  constructor() {
    this.emitter = new EventEmitter()
    this._records = []
  }

  get records() : Array<Product> {
    return this._records || [];
  }

  load() {
    this.loading = 'true'
    this.notify()
    setTimeout( () => Object.assign(this, { loading: false, _records: records }) &&
                      this.notify() , 1500 )
  }

  private notify() {
    this.emitter.emit("change")
  }

  subscribe(listener) {
    this.emitter.on("change", listener)
  }


}

export const store = new Store()