/// <reference path="../typings/index.d.ts" />

import 'reflect-metadata'
import 'whatwg-fetch'
import * as React from 'react'
import { Component } from 'react'
import { render as domRender } from 'react-dom'

interface SolrDocument {
  id: string,
  title: string
}

const JsonField = ({value, caption}) =>  value ? <div>
  {caption && <h3>{caption}</h3>}
  <pre className={caption && "large"}>
    {JSON.stringify(value, null, 2)}
  </pre>
</div> : null

type ApplicationState = {
  queryString?: string,
  response?: { docs: Array<SolrDocument>, numFound: number, start: number },
  responseHeader?: { QTime: number, params: {[key:string]: any}, status: number },
  facet_counts?: any,
  debug?: any
}

export class Application extends Component<any, ApplicationState> {

  constructor() {
    super()
    this.state = {

      queryString: null,
      response: {
        docs: [],
        numFound: 0,
        start: 0
      },
      responseHeader: {
        QTime: 0,
        params: {},
        status: 0
      }
    }
  }

  createQueryString() {
    const queryText = this.refs.query.value
   return queryText.replace(/([^=]*?)=(.*)[\n$]/g, (match, name, value) => `${name}=${encodeURIComponent(value)}&`)
  }

  handleChange(e) {
    var queryString = this.createQueryString()
    const solrQuery = encodeURIComponent(queryString)
    var payload = fetch(`http://localhost:5678/solr?query=${solrQuery}`)
                    .then(  result => result.json() )
                    .then(  payload => console.log(payload) || this.setState(payload) )
    this.setState({ queryString})
  }

  get docs() {
    return this.state.response.docs
  }

  refs: {
    [key:string]: Element,
    query: HTMLTextAreaElement
  }

  render() {

    return (
    <table vAlign="top" className="search-table">
      <tr>
        <td className="editor-cell">
          <h3>SOLR Query</h3>
          <textarea spellCheck="false" ref="query" onChange={this.handleChange.bind(this)}>
          </textarea>
          <small>{this.state.queryString}</small>
        </td>
        <td className="result-cell">
          <h3>Results found:{this.state.response.numFound} showing:{this.docs.length}</h3>
          {(this.docs.length > 0) && this.docs.map(doc => <JsonField value={doc} caption="" />)}
          <JsonField caption="Facets" value={this.state.facet_counts} />
          <JsonField caption="Debug" value={this.state.debug} />
          </td>
      </tr>
    </table>)
  }
}


domRender(<Application />, document.getElementById('container'))
