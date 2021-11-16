import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const MyAccount = (props) => {
  const { username, isAdmin, picture, email, address } = props.auth;

  return (
    <div className="user">
      <div className="user-left">
        <img src={picture} style={{ width: '130px', height: 'auto' }} />
      </div>
      <div className="user-right">
        <p><b>Username: </b> {username}</p>
        <p><b>User Type:</b> {isAdmin ? 'Admin' : 'Member'} </p>
        <p><b>Email:</b> {email ? email: 'N/A' } </p>
        <p><b>Address:</b> {address ? address : 'N/A'} </p>
        <button>Edit Account Info</button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapState)(MyAccount);
