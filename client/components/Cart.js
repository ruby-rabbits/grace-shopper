import React from 'react';
import { connect } from 'react-redux';
import { checkout, fetchAllCartProducts } from '../store/cart';
import ProductInCart from './ProductInCart';
import { Link } from 'react-router-dom';
class Cart extends React.Component {
  constructor() {
    super();
    this.onCheckout = this.onCheckout.bind(this);
    this.computeTotalPrice = this.computeTotalPrice.bind(this);
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
      return (total += product.price * product.cart_product.quantity);
    }, 0);
    return computedPrice.toFixed(2);
  }

  render() {
    return (
      <div className="cart">
        <div className="cart-items">
          <h1>Your Items</h1>
          {
            //would eventually be this.props.cart.map
            this.props.cart.length === 0
              ? <p style={{margin:'2rem'}}>Empty Cart</p>
              : this.props.cart.map((product, indx, arr) => {
                  return (
                    <React.Fragment key={product.id}>
                      <ProductInCart
                        userId={this.props.userId}
                        product={product}
                      />
                      {indx != arr.length - 1 ? <hr /> : null}
                    </React.Fragment>
                  );
                })
          }
        </div>
        <section className="checkout">
          {this.props.cart.length === 0 ? null : (
            <div>
              <h2>Total Price: ${this.computeTotalPrice()} </h2>
              <Link to='/checkout'>
              <button className="btn btn-checkout" onClick={this.onCheckout}>
                CHECKOUT
              </button>
              </Link>
            </div>
          )}
        </section>
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
