import * as React from 'react'
import { Component, ComponentLifecycle, ReactPropTypes, ValidationMap } from 'react'

export class StartupClass extends React.Component<any, any> {

  render() {
    return <div style={{border:'1px solid red'}}>Hello World - Plugin2 greets you</div>
  }

  static pluginName = "Plugin2"
}