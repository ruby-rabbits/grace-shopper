import React from 'react';
import { connect } from 'react-redux';
// import { createProduct, fetchAllProducts } from '../../../store/products';
import { fetchAllUsers, setAllUsers } from '../../../store/users';

export class AdminUsersList extends React.Component {
    constructor() {
        super();
    }
      async componentDidMount() {
        await this.props.fetchAllUsers();
      }

      componentWillUnmount() {
        this.props.clearAllUsers();
      }

    render() {
      const {users} = this.props;
        return (
          <div><h2>Admin - Users - List of All Users</h2>
          <ul>
          { (users.length === 0) ? 'Loading' : users.map(user => (<li key={`${user.id}`}>
            {user.username} - &nbsp;
            {user.isAdmin ? (
            <button onClick={() => alert('no longer admin - dummy fuinction') }>Demote from Admin</button>
            ) : (
              <button onClick={() => alert('make admin - dummy function') }>Make Admin</button>
            )} 
            </li>) ) }
          </ul>
        </div>
          );
    }
}

const mapState = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  clearAllUsers: () => dispatch(setAllUsers([]))
  });

  export default connect(mapState, mapDispatchToProps)(AdminUsersList);