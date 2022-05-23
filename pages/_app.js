import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script'
import Store from '../context/Store';

function MyApp({ Component, pageProps }) {
    return (<>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" />
        <Store>
            <Component {...pageProps} />
        </Store>
        </>
    )
}

export default MyApp
