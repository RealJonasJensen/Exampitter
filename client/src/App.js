import React, { Component } from 'react';

import { Route, Switch } from "react-router-dom";

import Layout from "./Hoc/Layout/Layout";
import Landing from "./Containers/Landing/Landing";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";

import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>

        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Landing} />
        </Switch>

      </Layout>
    );
  }
}

export default App;
