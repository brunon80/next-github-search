import Head from 'next/head'

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Github profile search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Github</h1>
            <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=109ecf07022e6ce12f4e">
                Login with Github
            </a>
        </div>
    )
}
