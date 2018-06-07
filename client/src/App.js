import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import store from "./store/store"

import jwt_decode from "jwt-decode";
import setAuthtoken from "./utility/setAuthToken";

import Layout from "./Hoc/Layout/Layout";
import Landing from "./Containers/Landing/Landing";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import Logout from "./Components/Logout/Logout";
import Aux from "./Hoc/Aux/Aux";

import './App.css';
import { setCurrentUser, logoutUser } from './store/actions/auth';


// A check to keep you logged in through page refresh

// Check if there is a token
if (localStorage.jwt) {
  // Set the token as auth in header
  setAuthtoken(localStorage.jwt)
  // decode token to get the user info
  const decoded = jwt_decode(localStorage.jwt)
  // Set user
  store.dispatch(setCurrentUser(decoded))
  // Check if the token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // redirect to login
    window.location.href = "/login"
  }
}




class App extends Component {


  render() {

    // console.log(this.props.auth.isAuthenticated)

    let routes = (
      <Aux>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Landing} />
      </Aux>
    )

    if (this.props.auth.isAuthenticated) {
      routes = (
        <Aux>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Dashboard} />
        </Aux>
      )
    }

    return (
      <Layout>
        <Switch>
          {routes}
        </Switch>
      </Layout>
    );
  }
}


const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}


export default withRouter(connect(mapStateToProps, null)(App));
