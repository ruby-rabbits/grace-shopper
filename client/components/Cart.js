import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCartProducts } from '../store/cart';
import ProductInCart from './ProductInCart';
class Cart extends React.Component {
  constructor() {
    super();
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
                    <ProductInCart userId={this.props.userId} product={product} key={product.id}/>
                  );
                })
          }
        </div>
        <div>
          <button id="checkout">
            <Link to="/checkout">Checkout</Link>
          </button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
