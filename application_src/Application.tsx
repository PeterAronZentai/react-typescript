/// <reference path="../typings/index.d.ts" />
import 'reflect-metadata'
import * as React from 'react'
import { Component, ComponentLifecycle, ReactPropTypes, ValidationMap } from 'react'
import { render as domRender } from 'react-dom'
import { store } from './Store'
import { ProductList } from './ProductDisplay'

export class Application extends Component<any, any> {

  componentDidMount() {
    store.subscribe( () => {
      this.setState({records: store.records})
    })
  }

  handleClick() {
    store.load()
  }

  render() {
    return <div>
      {store.loading && <div>Loading records...</div> }
      <ProductList records={store.records} />
      <button onClick={this.handleClick}>Load some data</button>
    </div>
  }
}


domRender(<Application />, document.getElementById('container'))
