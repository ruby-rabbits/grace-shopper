import React from "react";

class ProductInCart extends React.Component{
  constructor(props){
    super(props);
    this.state = {quantity: props.product.cart_product.quantity};
    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  onQuantityChange(e){
    this.setState({quantity: e.target.value});
  }

  render(){
    let {product} = this.props
    let price = (
      product.price * this.state.quantity
    ).toFixed(2);
    return (<div>
      <h3>{product.productName}</h3>
      <img
        style={{ width: '10rem', height: '13rem' }}
        src={product.picture}
      ></img>
      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={this.state.quantity}
          onChange={this.onQuantityChange}
        />

        <p>Price: {price}</p>
        {/* For testing purposes */}
      </div>
      <button style={{ backgroundColor: 'red' }}>Remove</button>
    </div>)
  }
}

export default ProductInCart
