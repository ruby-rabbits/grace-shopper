import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCartProducts } from '../store/cart';
import { fetchAllProducts } from '../store/products';
import AllProducts from './AllProducts';
import MiniCart from './MiniCart';

export class LandingPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllProducts();
    if (!this.props.cart) this.props.getCart();
  }
  render() {
    const products = this.props.products;
    const isLoggedIn = this.props.isLoggedIn;
    // get all product types, map out all product types and display it on landing page
    return (
      <div>
        {isLoggedIn ? (
          <h1 style={{marginTop: '0'}}>Welcome, {this.props.username}!</h1>
        ) : (
          <h1 style={{marginTop: '0'}}>Welcome, Guest!</h1>
        )}
        <h3>What do you want to see?</h3>

        <section className="withMini">
        { (products.length === 0) ? 'Loading' : <AllProducts />}

        <MiniCart />
        </section>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    products: state.products,
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};
const mapDispatch = (dispatch) => {
  // product types come through here
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    getCart: () => dispatch(fetchAllCartProducts())
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
