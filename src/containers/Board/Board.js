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
            const coins = Object.keys(coinsResponse.data).map(coin => coinsResponse.data[coin]).slice(0, 20)
            this.setState({ coins })
            console.log(coins)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (!this.state.coins) {
            return <h1>carregando...</h1>
        }
        return (
            <div>
                <Toolbar />
                <Table info={this.state.coins} />
            </div>
        )
    }
}

export default Board;




