import * as React from 'react'
import { Component, ComponentLifecycle, ReactPropTypes, ValidationMap } from 'react'
import { MyStore } from './DependencyForPlugin1'

console.log("Module environment initialized")
export class StartupClass extends React.Component<any, any> {

  constructor() {
    super()
    console.log("Plugin1 created")
  }
  render() {
    var s = new MyStore()
    return <div>Hello World - Plugin1 greets you</div>
  }

  static pluginName = "Plugin1"
}

