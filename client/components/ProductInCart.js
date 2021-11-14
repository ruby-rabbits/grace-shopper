import React from 'react';
import { connect } from 'react-redux';
import { changeQuantity } from '../store/cart';

class ProductInCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: props.product.cart_product.quantity };
    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  onQuantityChange(e) {
    this.setState({ quantity: e.target.value });
    // console.log(this.props);
    const {userId, product} = this.props;
    this.props.changeQuantity({userId, quantity : this.state.quantity, productId: product.id});
  }

  render() {
    let { product } = this.props;
    let price = (product.price * this.state.quantity).toFixed(2);
    return (
      <div>
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (data) => dispatch(changeQuantity(data)),
  };
};

export default connect(null, mapDispatchToProps)(ProductInCart);
