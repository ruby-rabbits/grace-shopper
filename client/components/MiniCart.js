import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MiniCart extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <span id="mini-cart">
        <Link to="/cart">
          {' '}
          <h3> Your Cart ({this.props.cart.length}) </h3>
        </Link>
        {this.props.cart.map((item) => (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            onClick={this.props.changeProduct ? () => this.props.changeProduct(item.id) : () => {}}
          >
            <div id="mini-cart-item">
              <img src={item.picture}></img>
              <p>
                {item.productName} x <b>{item.cart_product.quantity}</b>
              </p>
            </div>
          </Link>
        ))}
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(MiniCart);
