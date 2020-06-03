import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Protected({ children }) {
    const { push } = useRouter()
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        if (localStorage.access_token) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    if (isAuth) {
        return children
    } if (isAuth === false) {
        push('/')
    }
    return null
}
