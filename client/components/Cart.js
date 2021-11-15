import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkout, fetchAllCartProducts } from '../store/cart';
import ProductInCart from './ProductInCart';
class Cart extends React.Component {
  constructor() {
    super();
    this.onCheckout = this.onCheckout.bind(this);
    this.computeTotalPrice = this.computeTotalPrice.bind(this);
    // this.state = {totalPrice: 0}
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.getCart(this.props.userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId != prevProps.userId) {
      this.props.getCart(this.props.userId);
    }
  }

  onCheckout() {
    this.props.checkoutCart(this.props.userId);
  }

  computeTotalPrice() {
    let computedPrice = this.props.cart.reduce((total, product) => {
      return (total += (product.price * product.cart_product.quantity));
    },0);
    return computedPrice.toFixed(2);
    // this.setState({totalPrice: computedPrice});
  }

  render() {
    return (
      <div className="cart">
        <h1>Your Items:</h1>
        <div>
          {
            //would eventually be this.props.cart.map
            this.props.cart.length === 0
              ? 'Empty Cart'
              : this.props.cart.map((product) => {
                  return (
                    <ProductInCart
                      userId={this.props.userId}
                      product={product}
                      key={product.id}
                    />
                  );
                })
          }
        </div>
        <div>
          {this.props.cart.length === 0 ? null : (
            <React.Fragment>
              <h2>Total Price: {this.computeTotalPrice()} </h2>
              <button id="checkout" onClick={this.onCheckout}>
                <Link to="/checkout">Checkout</Link>
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.filter((product) => !product.cart_product.purchased),
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (userId) => {
      dispatch(fetchAllCartProducts(userId));
    },
    checkoutCart: (userId) => {
      dispatch(checkout(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
