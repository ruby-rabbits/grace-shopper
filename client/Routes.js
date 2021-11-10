
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import SingleProduct from './components/SingleProduct';
import Cart from "./components/Cart";
import { me } from "./store";


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* should be to their ind. user cart */}
              
             <Route path="/cart" component={Cart} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' exact component={ LandingPage } />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
          </Switch>
        )}
        {/* This is commented out, as I ran into some fuzzy loading if I made a seperate switch router. EDIT: FIXED with by stating EXACT PATH*/}
        <Switch>
          <Route exact path = '/products/:productId' component={SingleProduct} />
        </Switch>
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
