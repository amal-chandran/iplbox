import React, { Component } from 'react';
import { Dashboard, Login_Signup } from "./Views";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { store, history } from "./Helper";
import { Provider, connect } from "react-redux";
import { PrivateRoute, Notifi } from "./Components";
import { ConnectedRouter } from 'react-router-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div style={{ width: "100%", overflow: "hidden" }}>
            <Notifi />
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Login_Signup} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
