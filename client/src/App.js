import React, { Component } from 'react';
import axios from 'axios'
import jwtDecoded from 'jwt-decode'
import store from './redux/index'
import { Provider } from 'react-redux'
import Public from './screens/Public';
import Header from './Header'
import Admin from './screens/Admin'
import Restrito from './screens/Restrito'
import Login from './screens/Public/Login'
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={store} className="App">
        <h1>React Auth ...</h1>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={Public} />
              <Route  path='/user' component={Restrito} />
              <Route  path='/admin' component={Admin} />
              <Route  path='/login' component={Login} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
