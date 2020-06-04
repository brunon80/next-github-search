import { useState, useEffect } from 'react'
import Header from '../components/Header'
import '../styles/index.css'

export default function Root({ Component, pageProps }) {
    const [isAuthenticated, setAuth] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.access_token) setAuth(true)
        }, 100)
    }, [])
    return (
        <div>
            <Header isAuthenticated={isAuthenticated} />
            <Component isAuthenticated={isAuthenticated} {...pageProps} />
        </div>
    )
}
