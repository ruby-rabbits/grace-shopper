import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearCart } from '../store/cart';
import { getCategories } from '../store/category';

const Navbar = ({ handleClick, isLoggedIn, isAdmin, getCategories, categories}) => {

  useEffect(() => {
    getCategories();
  },[])

  return (
    <div className="nav-bar">
      <nav>
        <div className="all-links" style={{ paddingLeft: '2.5rem' }}>
          {/* The navbar will show these links after you log in */}
          <div className="left-links">
            <Link to="/" style={{ paddingLeft: '0', marginLeft: '0' }}>
              <h1>ShowShopper</h1>
            </Link>
            {categories.length != 0 ? categories.map(category => (<Link key={category.id} style={{margin: '1rem 0'}} to={`/${category.categoryURLName}`}>
            {`${category.categoryDisplayName}`}
                </Link>)) : null }
          </div>

          {/* this link would go to user account info once it exists */}
          <div className="right-links">
            {isAdmin ? <Link to="/admin">Admin Panel</Link> : <span></span>}
            {isLoggedIn ? (
              <span>
                <Link to="/myAccount">My Account</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link id="cartLink" to="/cart">
                  Cart(LoggedIn)
                </Link>
              </span>
            ) : (
              <span>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link id="cartLink" to="/cart">
                  Cart (guest)
                </Link>
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    categories: state.categories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearCart());
    },
    getCategories: () => {
      dispatch(getCategories());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
