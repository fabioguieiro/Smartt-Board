import React from 'react'
import classes from './Cell.module.css'

const cell = (props) => (
    <tr onClick={props.clicked} className={classes.Table}>
        <td>{props.coin.name}</td>
        <td>{props.coin.last}</td>
    </tr>
)
export default cell;