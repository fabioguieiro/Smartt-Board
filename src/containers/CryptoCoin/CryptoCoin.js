import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../../axios';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Auxiliary'
import classes from './CryptoCoin.module.css'

class CryptoCoin extends Component {

    state = {
        coins: [],
        chosenCoin: {}
    }
    async componentDidMount() {

        try {
            const coinsResponse = await axios.get('public?command=returnCurrencies')
            const coinsValuesResponse = await axios.get('public?command=returnTicker')
            // console.log(coinsResponse.data)
            // console.log(coinsValuesResponse.data)
            const coins = Object.keys(coinsResponse.data).map(coin => {
                //console.log('name', `USDT_${coin}`)
                // console.log('coin', coinsResponse.data[coin])
                // console.log('values', coinsValuesResponse.data[`USD_${coin}`])
                return ({ ...coinsResponse.data[coin], ...coinsValuesResponse.data[`USDT_${coin}`] })
            });
            this.setState({ coins })
            this.cleanCoinsArray();
            this.orderCoins();
            this.chooseCoin()
        } catch (error) {
            console.log(error)
        }
    }
    cleanCoinsArray() {
        let cleanedCoins = [];
        this.state.coins.map((coin) => {
            if (coin.last) {
                cleanedCoins.push(coin)
            }
            return coin;
        })
        this.setState({
            coins: cleanedCoins
        })
    }
    orderCoins() {
        let auxCoins = this.state.coins
        auxCoins.sort((a, b) => { return b.last - a.last });
        this.setState({ coins: auxCoins })
    }




    chooseCoin(){
        let id = this.props.match.params.id;
        this.state.coins.map(coin => {
            if(coin.id == id){
                this.setState({chosenCoin: coin})
            }
        })
    }
    logoClickedHandler(props) {
        console.log(props)
        this.props.history.push({ pathname: '/' })
    }
    render() {
        return (
            <Aux>
                <Toolbar clicked={() => this.logoClickedHandler(this.props)} />
                <div className={classes.div}>
                    <h1>{this.state.chosenCoin.name}</h1>
                    <h1>{this.state.chosenCoin.last}</h1>

                </div>
            </Aux>
        )
    }
}

export default CryptoCoin;