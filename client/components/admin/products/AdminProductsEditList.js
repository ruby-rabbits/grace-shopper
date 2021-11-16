import React from 'react';
import { connect } from 'react-redux';
// import { createProduct, fetchAllProducts } from '../../../store/products';

export class AdminProductsEditList extends React.Component {
    constructor() {
        super();
    }
      componentDidMount() {
      }

    render() {
        return (
            <div>Admin - Products - Edit List</div>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
  });

  export default connect(null, mapDispatchToProps)(AdminProductsEditList);