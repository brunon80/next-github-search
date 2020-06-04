import { useState, useEffect } from 'react'
import Header from '../components/Header'
import '../styles/index.css'

export default function Root({ Component, pageProps }) {
    const [isAuthenticated, setAuth] = useState(false)
    useEffect(() => {
        if (localStorage.access_token) setAuth(true)
    }, [])
    return (
        <div>
            <Header isAuthenticated={isAuthenticated} />
            <Component isAuthenticated={isAuthenticated} {...pageProps} />
        </div>
    )
}
