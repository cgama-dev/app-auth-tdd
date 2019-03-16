import React, { Component } from 'react';
import store from './redux/index'
import { Provider } from 'react-redux'
import Admin from './screens/Admin/Dashboard'
import Restrito from './screens/Restrito/Dashboard'
import Login from './screens/Public/Login'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={store} className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route  path='/user' component={Restrito} />
              <Route  path='/admin' component={Admin} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
