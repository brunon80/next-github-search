import React from 'react'

// import { Container } from './styles';

function Avatar({ url, width = 150 }) {
    return <img className="mx-auto rounded-full" src={url} alt="Avatar" width={width} />
}

export default Avatar
