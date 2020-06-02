import React from 'react'
import classes from './Cell.module.css'
import EmptyStar from '../../assets/icons/star-regular.svg'
import FullStar from '../../assets/icons/star-solid.svg'

// import Icon from '../../assets/images/logos/Bitcoin.svg'


const cell = (props) => (
    <tr  className={classes.Table}>
        <td onClick={props.clicked} ><img src={'/logos/'+props.coin.id+'.svg'}></img></td>
        <td onClick={props.clicked}>{props.coin.name}</td>
        <td onClick={props.clicked} className={classes.coinValues} style={{textAlign : "center"}}>U$ {props.coin.last}        <p className={props.coin.negativeChange ? classes.red : classes.green}>{props.coin.percentChange}%</p></td>
        <td onClick={() => props.toggleStarred(props.coin.id)}> <img src={props.isStarred ? FullStar : EmptyStar}></img></td>
    </tr>
)
export default cell;
