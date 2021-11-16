import React from 'react';
import { connect } from 'react-redux';
// import { createProduct, fetchAllProducts } from '../../../store/products';

export class AdminUsersAdmin extends React.Component {
    constructor() {
        super();
    }
      componentDidMount() {
      }

    render() {
        return (
            <div>Admin - Users - Confer Admin Priveleges</div>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
  });

  export default connect(null, mapDispatchToProps)(AdminUsersAdmin);