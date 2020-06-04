/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */

import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Protected from '../../components/protected'
import Title from '../../components/Title'
import Description from '../../components/Description'
import Avatar from '../../components/Avatar'
import Repositories from '../../components/Repositories'

export default function Profile({isAuthenticated }) {
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [userEmails, setUserEmails] = useState([])

    useEffect(() => {
        if (isAuthenticated) {
            const access_token = localStorage.getItem('access_token')
            fecthUserData(access_token).then(({ data }) => {
                setUser(data)
                fecthUserRepos(access_token, data.login).then(({ data: r }) => setRepos(r))
            })
            fecthUserEmails(access_token).then(({ data }) => setUserEmails(data))
        }
    }, [isAuthenticated])

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
    async function fecthUserRepos(access_token, login) {
        return axios.get(`https://api.github.com/users/${login}/repos`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
    }
    // console.log(repos)
    return (
        <Protected>
            <div className="container mx-auto my-12">
                <Head>
                    <title>{`${user.name} profile`}</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="flex flex-col mb-4 xl:flex-row">
                    <div>
                        <div className="p-10 bg-white rounded-lg shadow">
                            {
                                user.avatar_url && <Avatar url={user.avatar_url} />
                            }
                            <Title text={user.name} />
                            <Description text={user.bio} />
                            <h3 className="pt-10 text-center text-xl xl:text-left md:text-center">Private Emails</h3>
                            <ul>
                                {userEmails.map((e) => <li className="pb-10 text-center xl:text-left md:text-center" key={e.email}>{e.email}</li>)}
                            </ul>
                            <div className="text-center xl:text-left md:text-center sm:text-center">
                                <a className="text-black-500 font-bold" rel="noreferrer" target="_blank" href={user.html_url}>Visitar o perfil no Github</a>
                            </div>
                        </div>
                    </div>
                    <div className="px-0 bg-gray-100 mt-5 sm:px-0 md:px-0 lg:px-0 xl:px-10 sm:mt-5 xl:mt-0 sm:mt-5 lg:mt-5 md:mt-5">
                        <div className="grid flex-wrap xl:grid-cols-2 md:grid-cols-2 gap-4">
                            {
                                repos.map((rep) => (
                                    <Repositories
                                        key={rep.id}
                                        name={rep.name}
                                        description={rep.description}
                                        url={rep.html_url}
                                        login={rep.owner.login}
                                        language={rep.language}
                                        stars={rep.stargazers_count}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Protected>
    )
}
