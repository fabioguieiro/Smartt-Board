import React, { Component } from 'react'
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
            const coins = Object.keys(coinsResponse.data).map(coin => {
                return ({ ...coinsResponse.data[coin], ...coinsValuesResponse.data[`USDT_${coin}`] })
            });
            this.setState({ coins })
            this.cleanCoinsArray();
            this.chooseCoin()
        } catch (error) {
            console.log(error)
        }
    }
    cleanCoinsArray() {
        let cleanedCoins = [];
        this.state.coins.map((coin) => {
            if (coin.last) {
                const FourDecimals = coin.last.length - 4      //finds out the number of characters that the string must have
                coin.last = coin.last.slice(0, FourDecimals)   //slices the string so I can show 4 decimal numbers 
                cleanedCoins.push(coin)
            }
            return coin;
        })
        this.setState({
            coins: cleanedCoins
        })
    }



    chooseCoin(){
        let id = this.props.match.params.id;
        this.state.coins.map(coin => {
            if(coin.id == id){
                this.setState({chosenCoin: coin})
            }
            return coin;
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
                    <h1 className={classes.title}>{this.state.chosenCoin.name}</h1>
                    <h1 className={classes.value}> U$ {this.state.chosenCoin.last}</h1>
                </div>
            </Aux>
        )
    }
}

export default CryptoCoin;