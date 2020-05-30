import React from 'react'
import classes from './Cell.module.css'


const cell = (props) => (
    <tr onClick={props.clicked} className={classes.Table}>
        <td>{props.index}</td>
        <td>{props.coin.name}</td>
        <td className={classes.noWrap}>U$ {props.coin.last}</td>
        <td className={props.coin.negativeChange ? classes.red : classes.green}>{props.coin.percentChange}%</td>
    </tr>
)
export default cell;