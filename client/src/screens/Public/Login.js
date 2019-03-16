import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import ActionCreators from './../../redux/actions'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <br />
                    <Header as='h2' color='violet' textAlign='center'>
                        LOGIN :: AUTH
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' value={this.state.form.email} onChange={this.handleChange('email')} iconPosition='left' placeholder='Informe seu E-mail' />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={this.state.form.password} onChange={this.handleChange('password')}
                            />

                            <Button color='violet' fluid size='large' onClick={this.handleLogin}>
                                Entrar
                            </Button>
                        </Segment>
                    </Form>
                    {
                        this.props.auth.error &&
                        <Message negative>{this.props.auth.errorMessagem}</Message>
                    }
                </Grid.Column>
            </Grid>
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