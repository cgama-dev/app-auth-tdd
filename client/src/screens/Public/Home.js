import React, { Component } from 'react'

import { connect } from 'react-redux'

import ActionsCretors from './../../redux/actions'

class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1> Contador {this.props.number} </h1>
                <button type="button" onClick={() => this.props.increment(2)}> +</button>
                <button type="button" onClick={() => this.props.decrement(2)}> - </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        number: state.basic.number
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (skip) => dispatch(ActionsCretors.incrementRequest(skip)),
        decrement: (skip) => dispatch(ActionsCretors.decrement(skip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)