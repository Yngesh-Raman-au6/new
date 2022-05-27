import Head from 'next/head';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Carousel from '../Components/Carousel'
import axios from 'axios'
import { removeCookies } from 'cookies-next';
import { Context } from '../context/Store'
import React, { useContext, useEffect } from "react";
import authorize from '../lib/authorize'
import Profile from '../Components/Profile';


export async function getServerSideProps({ req, res }) {

    // authorization layer
    const authData = await authorize(req, res);

    if (!authData.data.authorization) {
        return {
            redirect: {
                destination: "/",
                parmanent: false
            }
        }
    }

    // return data to page
    return {
        props: {
            authData: authData.data
        }
    }
}

export default function Account({ authData }) {
    const [state, setState] = useContext(Context);

    useEffect(() => {
        if (authData.authorization) {
            setState(prevState => ({
                ...prevState,
                ['user']: authData.user,
            }));
        }
        else {
            removeCookies('refreshToken');
        }

    }, [])

    return (
        <>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} | { state.user?.username}</title>
            </Head>

            <Navbar />
            <Carousel />
            {state.user &&
                <Profile />
            }

            <Footer />

        </>
    )
}