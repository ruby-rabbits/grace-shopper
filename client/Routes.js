import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import LandingPage from "./components/LandingPage";
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import MyAccount from './components/MyAccount';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { me } from "./store";

// admin panel components
import AdminPanel from "./components/admin/AdminPanel.js"
import AdminPanelDenied from "./components/admin/AdminPanelDenied.js"

import AdminProductAdd from "./components/admin/products/AdminProductAdd";
import AdminProductsEditList from "./components/admin/products/AdminProductsEditList";
import AdminProductEditSingle from "./components/admin/products/AdminProductEditSingle";

import AdminUsersList from "./components/admin/users/AdminUsersList";
import AdminUserViewSingle from "./components/admin/users/AdminUserViewSingle";
import AdminUsersAdmin from "./components/admin/users/AdminUsersAdmin";
import CategoryPage from "./components/CategoryPage";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin, categories } = this.props;

    return (
      <div className="routes">
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/page/:pageNum" component={LandingPage} />
            <Route path="/myAccount" component={MyAccount} />
            {/* <Route exact path="/shows/:category" component={Signup} /> */}
            <Route exact path="/shows" component={AllProducts} />
            {/* should be to their ind. user cart */}
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />

          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" exact component={LandingPage} />
            <Route exact path="/page/:pageNum" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        )}
        {/* This is commented out, as I ran into some fuzzy loading if I made a seperate switch router. EDIT: FIXED with by stating EXACT PATH*/}
        <Switch>
          <Route exact path="/products/:productId" component={SingleProduct} />
          {
            categories.map( category => (
              <Route key={category.id} exact path={`/${category.categoryURLName}`} render= {() => <CategoryPage category={category} />} />
            ))
          }
        </Switch>
        {/* Admin panel authentication - if it is admin they can see everything. if they cant, they get the denial page*/}
        {isAdmin ? (
        <Switch>
          {/* admin panel root */}
          <Route exact path='/admin/' component={AdminPanel} />
          {/* product routes */}
          <Route exact path='/admin/products/add' component={AdminProductAdd} />
          <Route exact path='/admin/products/edit' component={AdminProductsEditList} />
          <Route exact path='/admin/products/edit/:productId' component={AdminProductEditSingle} />
          {/* user routes */}
          <Route exact path='/admin/users/view' component={AdminUsersList} />
          <Route exact path='/admin/users/view/:userId' component={AdminUserViewSingle} />
          <Route exact path='/admin/users/admin' component={AdminUsersAdmin} />

        </Switch>
        ) : (
          <Switch>
            <Route path='/admin' component={AdminPanelDenied} />
          </Switch>
        ) }
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    categories: state.categories
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
