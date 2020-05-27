import React, { Component } from 'react';
import axios from '../../axios';

class Board extends Component {
    state = {
        coins: [],
    }
    async componentDidMount() {
        try {
            const coinsResponse = await axios.get('public?command=returnCurrencies')
            const coins = Object.keys(coinsResponse.data).map(coin => coinsResponse.data[coin])
            this.setState({ coins })
        } catch (error) {
            console.log(error)
        }
    }
    renderCoins() {

    }

    render() {
        if (!this.state.coins) {
            return <h1>carregando...</h1>
        }
        return (
            <div className="App">
                {this.state.coins.map(coin => {
                    return <p key={coin.id}>{coin.name}</p>
                })}
            </div>
        )
    }
}

export default Board;
