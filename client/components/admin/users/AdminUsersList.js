import React from 'react';
import { connect } from 'react-redux';
// import { createProduct, fetchAllProducts } from '../../../store/products';

export class AdminUsersList extends React.Component {
    constructor() {
        super();
    }
      componentDidMount() {
      }

    render() {
        return (
            <div>Admin - Users - List of All Users</div>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
  });

  export default connect(null, mapDispatchToProps)(AdminUsersList);