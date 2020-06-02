import React, { Component } from 'react'
import axios from '../../axios';
import {useHistory} from 'react-router-dom'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Auxiliary'
import classes from './CryptoCoin.module.css'
import BackIcon from '../../assets/icons/back.svg'

class CryptoCoin extends Component {

    state = {
        coins: [],
        chosenCoin: {}
    }
    async componentDidMount() {

        try {
            const coinsResponse = await axios.get('public?command=returnCurrencies')
            const coinsValuesResponse = await axios.get('public?command=returnTicker')
            const coinsVolumeResponse = await axios.get('public?command=returnTicker')
            //const coinsHistoryResponse = await axios.get('public?command=returnTicker')
            const coins = Object.keys(coinsResponse.data).map(coin => {
                return ({ ...coinsResponse.data[coin], ...coinsValuesResponse.data[`USDT_${coin}`], coin })
            });
            this.setState({ coins })
            this.cleanCoinsArray();
            this.chooseCoin()
            console.log('[cryptocoin.js] coinsVolumeResponse: ', this.state.coins)
        } catch (error) {
            console.log(error)
        }
    }
    cleanCoinsArray() {
        let cleanedCoins = [];
        this.state.coins.map((coin) => {
            if (coin.last) {
                cleanedCoins.push(coin)
            }
            return coin;
        })
        this.setState({
            coins: cleanedCoins
        })
    }



    chooseCoin() {
        let id = this.props.match.params.id;
        this.state.coins.map(coin => {
            if (coin.id == id) {
                this.setState({ chosenCoin: coin })
            }
            return coin;
        })
    }
    logoClickedHandler(props) {
        props.history.push({ pathname: '/' })
    }
    goBackHandler(props){
        props.history.goBack()
    }
    render() {
        if (this.state.coins.length === 0) {
            return (
                <Aux>
                    <Toolbar />
                    <div className={classes.center}>
                        <div className={classes.loader}></div>
                    </div>
                </Aux>
            )
        }
        return (
            <Aux>
                <Toolbar clicked={() => this.logoClickedHandler(this.props)} />
                <img className={classes.BackIcon} src={BackIcon} onClick={() => this.goBackHandler(this.props)}></img>
                <div className={classes.div}>
                    <div className={classes.head}>
                        <img src={'/logos/' + this.state.chosenCoin.id + '.svg'} className={classes.logo} />
                        <h1 className={classes.title}>{this.state.chosenCoin.name}</h1>
                    </div>
                    <p className={classes.value}> U$ {this.state.chosenCoin.last}</p>
                    <hr className={classes.divisor}></hr>
                    <div className={classes.infoContainer}>
                        <div className={classes.infoCard}>
                            <p className={classes.cardTitile}> Volume (24h)</p>
                            <p className={classes.info}> U$ {this.state.chosenCoin.baseVolume}</p>
                        </div>
                        <div className={classes.infoCard}>
                            <p className={classes.cardTitile}> variação</p>
                            <p className={classes.info}> {this.state.chosenCoin.percentChange}%</p>
                        </div>
                        <div className={classes.infoCard}>
                            <p className={classes.cardTitile}> Taxa para transação</p>
                            <p className={classes.info}>{this.state.chosenCoin.txFee} {this.state.chosenCoin.coin}</p>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default CryptoCoin;