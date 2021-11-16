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
      console.log(this.props.props)
      const products = this.props.products;
        return (
            <div>Admin - Products - Edit List
              <ul>
              { (products.length === 0) ? 'Loading' : products.map(product => (<li><Link to={`/admin/products/edit/${product.id}`}>{product.productName}</Link></li>) ) }
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