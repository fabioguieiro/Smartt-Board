import React, { Component } from 'react';

import axios from '../../axios';
import Table from '../../components/Table/Table';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


class Board extends Component {
    state = {
        coins: [],
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
            this.setState({coins})
            this.cleanCoinsArray();
            this.orderCoins();
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
        console.log('new coins: ', this.state.coins)
    }
    orderCoins() {
        let auxCoins = this.state.coins
        auxCoins.sort( (a, b) => {return  b.last - a.last});
        this.setState({coins: auxCoins})
    }

    render() {
        if (!this.state.coins) {
            return <h1>carregando...</h1>
        }

        return (
            <div>
                <Toolbar />
                <Table info={this.state.coins} history={this.props.history} />
            </div>
        )
    }
}

export default Board;




