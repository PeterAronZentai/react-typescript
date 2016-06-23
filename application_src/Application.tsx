/// <reference path="../typings/index.d.ts" />

import 'reflect-metadata'
import * as React from 'react'
import { Component, ComponentLifecycle, ReactPropTypes, ValidationMap } from 'react'
import { render as domRender } from 'react-dom'
import { ProductList } from './ProductDisplay'


export class Application extends Component<any, any> {

  private loadedPlugins = []


  loadPlugin() {
    System.import(`application/plugins/${prompt('Plugin name')}`).then( ({StartupClass}) => {
      this.loadedPlugins.push(StartupClass)
      this.forceUpdate()
    })
  }
  render() {

    return <div>

        <button onClick={this.loadPlugin.bind(this)}>Load a plugin</button>
        <hr />
        {this.loadedPlugins.map( StartupClass => <StartupClass key={StartupClass.pluginName} /> )}
        <hr />
        <h3>Code</h3>
        <img src="pluginloader.png" style={{width:800}} /><br />
      </div>
  }
}


domRender(<Application />, document.getElementById('container'))
