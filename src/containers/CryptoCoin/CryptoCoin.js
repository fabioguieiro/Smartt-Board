import React, { Component } from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Auxiliary'
import classes from './CryptoCoin.module.css'

class CryptoCoin extends Component {
    componentDidMount() {
        console.log('[CryptoCoin.js]')
        console.log(this.props)
    }
    logoClickedHandler(props) {
        // console.log(props)
        this.props.history.push({ pathname: '/' })
    }


    render() {
        return (
            <Aux>
                <Toolbar clicked={() => this.logoClickedHandler(this.props)} />
                <div className={classes.div}>
                    <h1>{this.props.match.params.id}</h1>
                </div>
            </Aux>
        )
    }
}

export default CryptoCoin;