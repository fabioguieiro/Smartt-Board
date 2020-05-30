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
                <tbody>
                    {(this.props.info) ? this.props.info.map((coin,index) => {
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
        )
    }
}
export default Table;