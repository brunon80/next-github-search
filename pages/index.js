import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Home({ isAuthenticated }) {
    const [username, setUsername] = useState('')
    const { push } = useRouter()

    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])

    function onSubmit(e) {
        e.preventDefault()
        console.log(username)
        push(`/profile?username=${username}`)
    }
    return (
        <div className="container mx-auto">
            <Head>
                <title>Github profile search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex items-center justify-center mt-40">
                <img src="https://pngimg.com/uploads/github/github_PNG15.png" alt="logo" width={500} />
            </div>
            <div className="flex items-center justify-center">
                <form onSubmit={onSubmit} className="xl:w-1/2 mt-4 md:w-3/4 lg:w-3/5 w-5/6">
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Type a github username, eg. brunon80"
                        className="focus:border-blue-300 outline-none border-2 rounded-full p-2 px-5 w-full"
                        type="text"
                    />
                    <div className="flex items-center mt-8 justify-center flex-col md:flex-row xl:flex-row lg:flex-row sm:flex-col">
                        <button className="rounded p-3 px-8 bg-gray-700 text-white m-5" type="submit">Search on Github</button>
                        {
                            !isAuthenticated
                        && (
                            <a className="rounded p-3 px-8 bg-gray-700 text-white" href="https://github.com/login/oauth/authorize?scope=user:email&client_id=109ecf07022e6ce12f4e">
                                Login with Github
                            </a>
                        )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
