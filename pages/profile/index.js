/* eslint-disable camelcase */

import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Protected from '../../components/protected'

export default function Profile() {
    const [user, setUser] = useState({})
    const [userEmails, setUserEmails] = useState([])

    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        fecthUserData(access_token).then(({ data }) => setUser(data))
        fecthUserEmails(access_token).then(({ data }) => setUserEmails(data))
    }, [])

    async function fecthUserData(access_token) {
        return axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
    }
    async function fecthUserEmails(access_token) {
        return axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
    }
    console.log(user)
    return (
        <Protected>
            <div className="container">
                <Head>
                    <title>Github prifile search</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {
                    user.avatar_url && <img src={user.avatar_url} alt="Avatar" width={150} />
                }
                <h1>{user.name}</h1>
                <h2>{user.bio}</h2>
                <h3>Emails</h3>
                <ul>
                    {userEmails.map((e) => <li key={e.email}>{e.email}</li>)}
                </ul>
                <div>
                    <a rel="noreferrer" target="_blank" href={user.html_url}>Visitar o perfil no Github</a>
                </div>
                <div>
                    <Link href="/">Voltar a busca</Link>
                </div>
            </div>
        </Protected>
    )
}
