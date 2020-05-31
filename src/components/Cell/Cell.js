import React from 'react'
import classes from './Cell.module.css'
// import Icon from '../../assets/images/logos/Bitcoin.svg'


const cell = (props) => (
    <tr onClick={props.clicked} className={classes.Table}>
        <td><img src={'/logos/'+props.coin.id+'.svg'}></img></td>
        <td>{props.coin.name}</td>
        <td className={classes.noWrap}>U$ {props.coin.last}</td>
        <td className={props.coin.negativeChange ? classes.red : classes.green}>{props.coin.percentChange}%</td>
    </tr>
)
export default cell;