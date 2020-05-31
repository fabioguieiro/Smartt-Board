import React, { Component } from 'react';

import axios from '../../axios';

import Aux from '../../hoc/Auxiliary'
import Table from '../../components/Table/Table';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Pagination from '../../components/Navigation/Pagination/Pagination'

import classes from './Board.module.css';


class Board extends Component {
    state = {
        coins: [],
        search: "",
        paginatedContent: []
    }
    async componentDidMount() { //loads the data from the endpoints
        try {
            const coinsResponse = await axios.get('public?command=returnCurrencies')
            const coinsValuesResponse = await axios.get('public?command=returnTicker')
            const coins = Object.keys(coinsResponse.data).map(coin => {
                return ({ ...coinsResponse.data[coin], ...coinsValuesResponse.data[`USDT_${coin}`] })
            });
            this.setState({ coins })
            this.cleanCoinsArray();
            this.orderCoins();
            this.sliceContent();
            console.log('coins: ', this.state.coins)
        } catch (error) {
            console.log(error)
        }
    }
    cleanCoinsArray() { //Removes the coins that not have a pair with USDT. 
        let cleanedCoins = [];
        this.state.coins.map((coin) => {
            if (coin.last) {
                const twoDecimals = coin.last.length - 6      //finds out the number of characters that the string must have
                coin.last = coin.last.slice(0, twoDecimals)   //slices the string so I can show just 2 decimal numbers 
                coin.percentChange = coin.percentChange.slice(0, 4) //slices the string so I can show just 2 decimal numbers
                if(coin.percentChange.includes("-")) coin.negativeChange=true
                else coin.negativeChange=false
                cleanedCoins.push(coin)
            }
            return coin;
        })
        this.setState({
            coins: cleanedCoins
        })
    }

    orderCoins() { //Orders the array, so the most valuable coins are shown first  
        let auxCoins = this.state.coins
        auxCoins.sort((a, b) => { return b.last - a.last });
        this.setState({ coins: auxCoins })
    }
    sliceContent(){
        this.setState({paginatedContent: this.state.coins.slice(0,20)})
    }
    render() {
        if (this.state.coins.length === 0) {
            return (
                <Aux>
                    <Toolbar />
                    <div className={classes.center}>
                        <div className={classes.loader}></div>
                    </div>
                </Aux>
            )
        }

        return (
            <Aux>
                <Toolbar />
                <Table info={this.state.coins} history={this.props.history} />
                <Pagination info={this.state.coins}/>
            </Aux>
        )
    }
}

export default Board;




