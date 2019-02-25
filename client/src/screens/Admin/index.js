import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

const Admin = (props) => {
    console.log(props)
    return (
        <div>
            <div>
                <Link to='/admin'>Home</Link>
                <Link to='/admin/users'>Users</Link>
            </div>
            <div>
                <Switch>
                    <Route path={`${props.match.path}/users`} component={(props) => <h1>Home Admin Users</h1>} />
                    <Route path={`${props.match.path}/`} component={(props) => <h1>Home Admin</h1>} />
                </Switch>
            </div>
        </div>
    )
}

export default Admin