import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const AdminPanel = (props) => {
  // console.log(props);
  const { username, isAdmin, picture } = props;

  return (
    <div className="adminPanel">
      <h1>GraceShopper Admin Panel</h1>
      <p>This is a lot of power...</p>
      <h2>Products</h2>
        <ul>
            <li><Link to='/admin/products/add'>Add A Product</Link></li>
            <li><Link to='/admin/products/edit'>Edit/Delete Products</Link></li>
        </ul>
      <h2>Users</h2>
      <ul>
            <li><Link to='/admin/users/view'>View All Users</Link></li>
            <li><Link to='/admin/users/admin'>Confer Administrative Priveleges</Link></li>
        </ul>


    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    /* username: state.auth.username,
    isAdmin: state.auth.isAdmin,
    picture: state.auth.picture, */
  };
};

export default connect(mapState)(AdminPanel);
