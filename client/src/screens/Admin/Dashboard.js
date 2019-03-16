import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Menu, Container } from 'semantic-ui-react'
import ActionCreators from '../../redux/actions'


const Admin = (props) => {


    if (!props.auth.isAuth) {
        return <Redirect to='/' />
    }

    if (props.auth.isAuth && props.auth.user.role !== 'admin') {
        return <Redirect to='/user' />
    }

    return (
        <div>
            <Menu color='violet'>
                <Menu.Item name='home' active={true}  />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        Seja Bem vindo, {props.auth.user.name}
                    </Menu.Item>
                    <Menu.Item
                        name='Sair'
                        onClick={() => props.logout()}
                    />
                </Menu.Menu>
            </Menu>
            <Container textAlign='center'><h1>Dashboard Admin </h1></Container>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(ActionCreators.signupAuthRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)