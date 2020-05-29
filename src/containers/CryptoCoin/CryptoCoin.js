import React, { Component } from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

class CryptoCoin extends Component {
    componentDidMount() {
        console.log('[CryptoCoin.js]')
        console.log(this.props)
    }
    logoClickedHandler(props){
        // console.log(props)
        this.props.history.push({pathname:'/'})
    }


    render() {
        return (
            <div>
                <Toolbar clicked={()=> this.logoClickedHandler(this.props)}/>
                <h1>{this.props.match.params.id}</h1>
            </div>
        )
    }
}

export default CryptoCoin;