import * as React from 'react'
import { Component, ComponentLifecycle, ReactPropTypes, ValidationMap } from 'react'


export class ProductList extends React.Component<any, any> {

  render() {
    return (<ul>
      {this.props.records.map(r => <li>
        <ProductLabel name={r.ProductName} id={r.ProductId} />
        <ProductDetail price={r.UnitPrice} inStock={r.UnitsInStock > 0} />
      </li>)}
    </ul>)
  }

  static propTypes = {
    records: React.PropTypes.array.isRequired
  }
}


interface ProductLabelModel {
  name: string,
  id: number
}

export class ProductLabel extends React.Component<ProductLabelModel, any> {
  render() {
    return <div>
      <div>{this.props.name}</div>
      <a href={`/go/to/product/${this.props.id}`}>buy me</a>
    </div>
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired
  }

}



export class ProductDetail extends React.Component<any, any> {
  render() {
    return <div>
      <div>Price: {this.props.price}</div>
      {this.props.inStock && <button>Buy me</button>}
    </div>
  }

  static propTypes = {
    price: React.PropTypes.number.isRequired,
    inStock: React.PropTypes.bool.isRequired
  }
}
