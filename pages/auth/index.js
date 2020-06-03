
import { useRouter } from 'next/router'

export default function Callback() {
    const { query, push } = useRouter()
    if (query.access_token) {
        localStorage.setItem('access_token', query.access_token)
        push('/profile')
    }

    return (null)
}
