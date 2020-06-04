import '../styles/index.css'
import Header from '../components/Header'

export default function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Header />
            <Component {...pageProps} />
        </div>
    )
}
