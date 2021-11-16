import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { addToCart } from '../store/cart';
import { fetchAllProducts } from '../store/products';
import ProductCard from './ProductCard';

class AllProducts extends React.Component {
  componentDidMount() {
    // will only be called if we go to /shows directly
    if (this.props.products.length === 0) this.props.fetchAllProducts();
  }

  render() {
    // console.log(this.props)
    const products = this.props.products;
    // get all product types, map out all product types and display it on landing page
    return (
      <div className="all-product-container">
          {products.map((product) => {
            return (
              <ProductCard userId={this.props.userId} product={product} key={product.id}/>

            );
          })}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    products: state.products,
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    userId: state.auth.id
  };
};
const mapDispatch = (dispatch) => {
  // product types come through here
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    // addToCart: (userId, productId, quantity) => dispatch(addToCart(userId, productId, quantity))
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
