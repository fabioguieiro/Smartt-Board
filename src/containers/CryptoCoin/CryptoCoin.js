import React from 'react'

const criptoCoin = (props) => {
    return (
        <h1>{props.match.params.id}</h1>
    )
}

export default criptoCoin