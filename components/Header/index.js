/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

// import { Container } from './styles';

function Header({ isAuthenticated }) {
    const [user, setUser] = useState({})
    const { reload, push } = useRouter()
    useEffect(() => {
        if (isAuthenticated) {
            const access_token = localStorage.getItem('access_token')
            fecthUserData(access_token).then(({ data }) => setUser(data))
        }
    }, [isAuthenticated])

    async function fecthUserData(access_token) {
        return axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
    }

    function logout() {
        localStorage.clear()
        reload()
    }

    return (
        <div className="p-2 flex flex-col justify-between items-center xl:flex-row lg:flex-row md:flex-row sm:flex-col">
            <Link href="/">
                <div className="flex align-middle items-center cursor-pointer">
                    <img className="ml-4" width={50} src="https://i.pinimg.com/originals/b1/5e/ed/b15eedbdafbbdbca3249e3942f4faf3b.png" alt="github logo" />
                    <h1 className="text-xl ml-4">Github Profile Search</h1>
                </div>
            </Link>
            {
                isAuthenticated && (
                    <div className="flex flex-col mr-4">
                        <div className="flex items-center">
                            <Link href="/profile" className="text-xl mr-4"><a className="text-xl">{user.name}</a></Link>
                            <img className="rounded-full ml-4" width={40} src={user.avatar_url} alt="" />
                        </div>
                        <button className="self-start rounded px-5 bg-gray-700 text-white" type="button" onClick={logout}>Sair</button>
                    </div>
                )
            }
        </div>
    )
}

export default Header
