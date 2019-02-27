import React from 'react'
import { connect } from 'react-redux'
import ActionCretors from './redux/actions'
import { Link } from 'react-router-dom'
const Header = (props) => {
    return (
        <div>
            <Link to='/' >Home</Link>
            <Link to='/user' >User</Link>
            <Link to='/admin' >Admin</Link>
            <Link to='/login' >Login</Link>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    signing: (email, password) => dispatch(ActionCretors.signingRequest(email, password))
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)