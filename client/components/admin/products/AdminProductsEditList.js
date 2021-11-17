import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../../../store/products';
import { Link } from 'react-router-dom';

export class AdminProductsEditList extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
      this.props.fetchAllProducts();
    }

    render() {
      const products = this.props.products;
        return (
            <div><h2>Admin - Products - Edit/Delete List</h2>
              <span>Click link to edit, click x button to delete.</span>
              <ul>
              { (products.length === 0) ? 'Loading' : products.map(product => (<li key={`${product.id}`}><Link to={`/admin/products/edit/${product.id}`}>{product.productName}</Link> <button>x</button></li>) ) }
              </ul>
            </div>
            
          );
    }
}

const mapState = (state) => {
  return {
    products: state.products
  };
};
  
  const mapDispatchToProps = (dispatch) => ({
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  });

  export default connect(mapState, mapDispatchToProps)(AdminProductsEditList);