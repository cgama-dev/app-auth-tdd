import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Restrito = (props) => {

    if (!props.auth.isAuth) {
        return <Redirect to='/login' />
    }
    return (
        <h1>User Comum, área restrita ...</h1>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Restrito)