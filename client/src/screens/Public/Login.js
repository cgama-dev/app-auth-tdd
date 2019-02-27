import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import ActionCreators from './../../redux/actions'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                email: '',
                password: ''
            }
        }
    }
    handleChange = field => event => {
        const form = {
            ...this.state.form
        }
        form[field] = event.target.value

        this.setState({ form })
    }
    handleLogin = () => {
        const { email, password } = this.state.form

        this.props.login(email, password)
    }
    render() {
        if (this.props.auth.isAuth) {
            if (this.props.auth.user.role === 'admin') {
                return <Redirect to='/admin' />
            }
            return <Redirect to='/user' />
        }
        return (
            <div>
                {JSON.stringify(this.props)}
                <input type="text" value={this.state.form.email} onChange={this.handleChange('email')} />
                <input type="password" value={this.state.form.password} onChange={this.handleChange('password')} />
                <button type="button" onClick={this.handleLogin}>Entrar</button>

                {
                    this.props.auth.error &&
                    <h1>{this.props.auth.errorMessagem}</h1>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log()
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(ActionCreators.signingRequest(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)