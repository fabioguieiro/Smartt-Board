import React from 'react'
import classes from './Table.module.css';

const table = (props) => (
    
    <table className={classes.Table}           style={{
        height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
      }}>
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