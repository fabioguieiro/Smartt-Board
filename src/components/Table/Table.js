import React from 'react'
import classes from './Table.module.css';

const table = (props) => (
    
    <table className={classes.Table} cellpadding="0" cellspacing="0" border="0">
        <thead>
            <tr>
                <th>Name</th>
                <th>txFee</th>
                <th>minConf</th>
            </tr>
        </thead>
        <tbody>
            {props.info.map(coin => {
                return (
                    <tr key={coin.id}>
                        <td>{coin.name}</td>
                        <td>{coin.txFee}</td>
                        <td>{coin.minConf}</td>
                    </tr>
                )

            })}
        </tbody>
    </table>
)

export default table;