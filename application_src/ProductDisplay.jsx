import * as React from 'react'
import { Component, ComponentLifecycle, ReactPropTypes, ValidationMap } from 'react'


const getDetailModel = product => ({
  price: product.UnitPrice,
  inStock: product.UnitsInStock > 0
})

export class ProductList extends React.Component {

  render() {
    return (<ul>
      {this.props.records.map(r => <li>
        <ProductLabel name={r.ProductName} id={r.ProductId} />
        <ProductDetail price={r.UnitPrice} inStock={r.UnitsInStock > 0} />
      </li>)}
    </ul>)
  }
}

ProductList.propTypes = {
  records: React.PropTypes.array.isRequired
}


export class ProductLabel extends React.Component {
  render() {
    return <div>
      <div>{this.props.name}</div>
      <a href={`/go/to/product/${this.props.id}`}>buy me</a>
    </div>
  }
}
ProductLabel.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired
}



export class ProductDetail extends React.Component {
  render() {
    return <div>
      <div>Price: {this.props.price}</div>
      {this.props.inStock && <button>Buy me</button>}
    </div>
  }
}
ProductLabel.propTypes = {
  price: React.PropTypes.number.isRequired,
  inStock: React.PropTypes.bool.isRequired
}