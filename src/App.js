import React, { Component } from 'react';
import { Dashboard, Initial, Login } from "./Views";
import { HashRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Route exact path="/" component={Initial} />
          <Route exact path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
