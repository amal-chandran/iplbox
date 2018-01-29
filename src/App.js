import React, { Component } from 'react';
import { Dashboard, Initial } from "./Views";
import { HashRouter as Router, Route } from 'react-router-dom';
import {
  SocketProvider,
  socketConnect,
} from 'socket.io-react';


class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Route exact path="/" component={Initial} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
