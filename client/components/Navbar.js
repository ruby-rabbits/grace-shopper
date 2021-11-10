import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Welcome to Show Shopper!</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          {/* this link would go to user account info once it exists */}
          <Link to="/home">My Account</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {/* if logged in should go to loggedin users cart */}
          {/* <Link to={`/${userId}/cart`}>Cart</Link> */}
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          {/* how to get these to the right?*/}
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link id="cartLink" to="/cart">
            Cart
          </Link>
        </div>
      )}
    </nav>
    <hr />
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
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
