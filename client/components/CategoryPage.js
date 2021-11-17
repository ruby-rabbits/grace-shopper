import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../store/products';
import ProductCard from './ProductCard';

class CategoryPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.fetchAllProducts();
    }
  }

  // needs to show filtered set of products
  render() {
    let filteredProduct = [];
    if (this.props.products.length != 0) {
      filteredProduct = this.props.products.filter(
        (product) =>
          product.category.categoryURLName ===
          this.props.category.categoryURLName
      );
    }
    return (
      <React.Fragment>
        <h1>{this.props.category.categoryDisplayName}</h1>
        <div className="all-product-container">
          {this.props.products.length != 0
            ? filteredProduct.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
