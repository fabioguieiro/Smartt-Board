import React, { Component } from 'react'
import classes from './Table.module.css';

import Cell from '../Cell/Cell'

class Table extends Component {
    state = {
        search: ""
    }

    updateSearchHandler(event) {
        this.setState({ search: event.target.value })
    }
    chooseCoinHandler(coinId) {
        this.props.history.push({ pathname: '/cryptocoin/' + coinId })
    }
    render() {
        if (!this.props.coins) return null
        let filteredCoins = this.props.coins.filter(
            (coin) => {
                return coin.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div className={classes.container}>
                <div className={classes.searchContainer}>
                    <input placeholder='Search' className={classes.input} type="search" value={this.state.search} onChange={this.updateSearchHandler.bind(this)} />
                </div>
                <table className={classes.Table} cellPadding="0" cellSpacing="0" border="0">
                    <tbody>
                        {(this.props.coins) ? filteredCoins.map((coin, index) => {
                            return (
                                <Cell
                                    key={index}
                                    index={index + 1}
                                    coin={coin}
                                    clicked={() => this.chooseCoinHandler(coin.id)} />
                            )

                        }) : null}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Table;