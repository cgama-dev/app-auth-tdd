import React, { Component } from 'react';
import axios from 'axios'
import jwtDecoded from 'jwt-decode'
class App extends Component {

  async componentDidMount() {
    let token = localStorage.getItem('token-auth')

    if (!token) {

      const user = await axios.post('http://localhost:5004/authenticate', {
        email: 'cleytongama@gmail.com',
        passwd: '123123'
      })

      token = user.data.data.token

      localStorage.setItem('token-auth', token)
    }
    console.log(jwtDecoded(token))

    const users = await axios.get('http://localhost:5004/users', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    
    console.log(users)
  }

  render() {
    return (
      <div className="App">
        <h1>Hello React</h1>
      </div>
    );
  }
}

export default App;
