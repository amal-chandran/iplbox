import React, { Component } from 'react';
import { Dashboard, Initial, Login_Signup } from "./Views";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { store, history } from "./Helper";
import { Provider, connect } from "react-redux";
import { PrivateRoute } from "./Components";
import { ConnectedRouter } from 'react-router-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <ConnectedRouter history={history}>
            <Switch>
              {/* <Route exact path="/" component={Initial} /> */}
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Login_Signup} />
            </Switch>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
