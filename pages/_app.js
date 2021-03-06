import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script'
import Store from '../context/Store';
import { Router } from "next/router";
import NProgress from 'nprogress'
import { QueryClientProvider, QueryClient } from 'react-query';

function MyApp({ Component, pageProps }) {

    const queryClient = new QueryClient;

    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', (url) => {
        NProgress.start()
    });
    Router.events.on('routeChangeComplete', (url) => {
        NProgress.done()
    });

    return (<>
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"
            integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossOrigin="anonymous" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js"
            integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossOrigin="anonymous" />
        <Store>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </Store>
    </>
    )
}

export default MyApp
