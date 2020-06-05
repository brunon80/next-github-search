/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */

import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Protected from '../../components/protected'
import ProfileView from '../../components/Profile'

export default function Profile({ isAuthenticated }) {
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [userEmails, setUserEmails] = useState([])

    const { query } = useRouter()

    useEffect(() => {
        setUser({})
        setRepos([])
        setUserEmails([])
        if (query.username) {
            fecthUserData(query.username).then(({ data }) => {
                setUser(data)
                fecthUserRepos(data.login).then(({ data: r }) => setRepos(r))
            })
        } else if (isAuthenticated) {
            const access_token = localStorage.getItem('access_token')
            fecthAuthUserData(access_token).then(({ data }) => {
                setUser(data)
                fecthUserRepos(data.login, access_token).then(({ data: r }) => setRepos(r))
            })
            fecthUserEmails(access_token).then(({ data }) => setUserEmails(data))
        }
    }, [isAuthenticated, query])

    async function fecthUserData(username) {
        return axios.get(`https://api.github.com/users/${username}`)
    }

    async function fecthAuthUserData(access_token) {
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
    async function fecthUserRepos(login, access_token) {
        const headers = {}
        if (access_token) headers.Authorization = `token ${access_token}`
        return axios.get(`https://api.github.com/users/${login}/repos`, {
            headers,
        })
    }
    // console.log(repos)
    return (
        <Protected>
            <Head>
                <title>{`${user.name} profile`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProfileView
                userEmails={userEmails}
                user={user}
                repos={repos}
            />
        </Protected>
    )
}
