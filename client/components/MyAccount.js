import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const MyAccount = (props) => {
  console.log(props);
  const { username, isAdmin, picture } = props;

  return (
    <div className="user">
      <div className="user-left">
        <img src={picture} style={{ width: '130px' }} />
      </div>
      <div className="user-right">
        <p><b>Username: </b> {username}</p>
        <p><b>User Type:</b> {isAdmin ? 'Admin' : 'Member'} </p>
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
    username: state.auth.username,
    isAdmin: state.auth.isAdmin,
    picture: state.auth.picture,
  };
};

export default connect(mapState)(MyAccount);
