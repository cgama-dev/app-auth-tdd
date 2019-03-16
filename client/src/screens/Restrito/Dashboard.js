import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'
import ActionCreators from '../../redux/actions'

const Restrito = (props) => {

    if (!props.auth.isAuth) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <Menu color='green'>
                <Menu.Item name='home' active={true} />
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
            <Container textAlign='center'><h1>Dashboard Usuário Comum </h1></Container>
        </div>
    )
}


const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(ActionCreators.signupAuthRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Restrito)