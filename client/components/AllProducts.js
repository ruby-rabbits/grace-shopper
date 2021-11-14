import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../store/products';

class AllProducts extends React.Component {
  componentDidMount(){
    // will only be called if we go to /shows directly
    if(this.props.products.length === 0) this.props.fetchAllProducts();
  }


  render() {
    const products = this.props.products;
    // get all product types, map out all product types and display it on landing page
    return (
      <div className="all-product-root">
        <div className="allProducts">
        <h2>What do you want to see?</h2>
          {products.map((product) => {
            return (
              <ul key={product.id}>
                <img src={product.picture} />
                <li>{product.productName}</li>
                <li>{product.description}</li>
                <li>{product.price}</li>
              </ul>
            );
          })
        }
        </div>
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
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
