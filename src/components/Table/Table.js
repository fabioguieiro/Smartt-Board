import React, { Component } from 'react'
import classes from './Table.module.css';

import Cell from '../Cell/Cell'

class Table extends Component {

    chooseCoinHandler(coinId) {
        this.props.history.push({pathname:'/cryptocoin/' + coinId})
    }
    render() {
        return (

            <table className={classes.Table} cellPadding="0" cellSpacing="0" border="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price(USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.props.info) ? this.props.info.map(coin => {
                        return (
                                <Cell
                                    key={coin.name}
                                    coin={coin}
                                    clicked={() => this.chooseCoinHandler(coin.id)} />
                        )

                    }) : null}
                </tbody>
            </table>
        )
    }
}
export default Table;