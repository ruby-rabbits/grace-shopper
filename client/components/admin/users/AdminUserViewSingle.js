import React from 'react';
import { connect } from 'react-redux';
// import { createProduct, fetchAllProducts } from '../../../store/products';

export class AdminUserViewSingle extends React.Component {
    constructor() {
        super();
    }
      componentDidMount() {
      }

    render() {
        return (
            <div>Admin - Users - View Single User</div>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
  });

  export default connect(null, mapDispatchToProps)(AdminUserViewSingle);