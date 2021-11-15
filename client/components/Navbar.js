import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearCart } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="nav-bar">
    {/* <h1 style={{paddingLeft: '2.5rem'}}>Welcome to Show Shopper!</h1> */}
    <nav>
      {isLoggedIn ? (
        <div className="all-links" style={{ paddingLeft: '2.5rem' }}>
          {/* The navbar will show these links after you log in */}
          <Link to="/" style={{ paddingLeft: '0', marginLeft: '0' }}>
            <h1>ShowShopper</h1>
          </Link>
          {/* this link would go to user account info once it exists */}
          <div className="right-links">
            <Link to="/myAccount">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link id="cartLink" to="/cart">
              Cart
            </Link>
          </div>
        </div>
      ) : (
        <div className="all-links" style={{ paddingLeft: '2.5rem' }}>
          <Link to="/" style={{ paddingLeft: '0', marginLeft: '0' }}>
            <h1>ShowShopper</h1>
          </Link>
          {/* how to get these to the right?*/}
          {/* The navbar will show these links before you log in */}
          <div className="right-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link id="cartLink" to="/cart">
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearCart());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
