import React, { Component } from 'react'

class Pagination extends Component {
    state = {
        coins: [],
        pages: []
    }
    componentDidUpdate() {
        this.state.coins = this.props.info
        this.numberOfPagesHandler()
    }
    numberOfPagesHandler() {
        let number = Math.ceil(this.state.coins.length / 20)
        for (let i = 1; i <= number; i++) {
            this.state.pages.push(i)
        }
        return number
    }
    render() {
        if (this.state.pages.length === 0) return null;
        else {
            return(

                this.state.pages.map(page => {
                    return (
                        <a href={'/pages/'+page} key={page}>{page}</a>
                        )
                    })
                    )
                }
    }
}

export default Pagination;