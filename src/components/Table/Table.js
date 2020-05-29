import React, { Component } from 'react'
import classes from './Table.module.css';
import { NavLink } from 'react-router-dom'
import Cell from '../Cell/Cell'

class Table extends Component {

    chooseCoinHandler(coinId) {
        console.log('to aqui ' )
        // const history = useHistory()
        // history.push(`/criptocoin/${coinName}`, {coinName})
    }
    render() {
        return (

            <table className={classes.Table} cellPadding="0" cellSpacing="0" border="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>txFee</th>
                        <th>minConf</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.info.map(coin => {
                        return (
                            <NavLink
                                to={"/criptocoin/" + coin.id}
                                key={coin.id} >
                                <Cell
                                    coin={coin}
                                    clicked={() => this.chooseCoinHandler(coin.id)} />
                            </NavLink>
                        )

                    })}
                </tbody>
            </table>
        )
    }
}
export default Table;