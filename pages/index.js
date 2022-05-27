import Head from 'next/head'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import OfferWalls from '../Components/Offerwalls'
import Tasks from '../Components/Tasks'
import AuthModel from '../Components/AuthModel'
import Carousel from '../Components/Carousel'
import axios from 'axios'
import { removeCookies } from 'cookies-next';
import { Context } from '../context/Store'
import React,{ useContext, useEffect } from "react";
import authorize from '../lib/authorize'
import buildId from 'build-id'
import ReCAPTCHA from "react-google-recaptcha";


Home.getInitialProps = async ({ req, res }) => {

    // authorization layer
    const authData = await authorize(req, res);

    // get offers
    const offerUrl = `https://wall.adgaterewards.com/apiv1/vc/oKuUpw/users/${authData.data.user ? authData.data.user._id : buildId()}/offers?country_code=in`
    const OffersRes = await axios.get(offerUrl);

    // return data to page
    return { authData: authData.data, offers: OffersRes.data }
}

export default function Home({ authData, offers }) {
    const [state, setState] = useContext(Context);
    const recaptchaRef = React.createRef();

    const onReCAPTCHAChange = (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        // Else reCAPTCHA was executed successfully so proceed with the 
        setState(prevState => ({
            ...prevState,
            ['isVerifired']: true,
        }))
        // Reset the reCAPTCHA so that it can be executed again if user 
        // submits another email.
        recaptchaRef.current.reset();
    }

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
                <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>

            <div className="fixed-top">
            <Navbar />
                <Carousel />
            </div>

            {/* Modal */}
            <AuthModel />
            <div style={{ zIndex: "6", position: "absolute" }}>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6Ld5zh8gAAAAAAsDOB4gBjcOn3xekyoS6AvupPwb"
                onChange={onReCAPTCHAChange}
                />
                </div>

            <div className="bg-dark mt-lg-5" style={{ paddingTop: '13vh' }}>

                <h2 className="pt-5 px-5 fw-bold text-bright">Offer Walls</h2>
                <h6 className="text-white pt-2 px-5 fw-bold">Choose from the one to start earning coins ( 1000 Coins equals to $1 )</h6>
                <OfferWalls />

                <h2 className="pt-3 px-5 fw-bold text-bright">Tasks</h2>
                <h6 className="text-white pt-2 px-5 fw-bold">Complete any of the task below to earn coins ( 1000 Coins equals to $1 )</h6>
                {!state.user &&
                    <div className="container pt-5 px-5">
                        <div className="alert alert-warning text-center" role="alert">
                        <h4 className="alert-heading fs-5">Please <strong>login</strong> to view the content below </h4>
                            <small>Due to security reasons you are not allowed to view the content below without login.
                                This section will be locked and is only available to valid logged in user.</small>
                        </div>

                    </div>
                }
                <Tasks offers={offers} />


            </div>
            <Footer />
        </>
            )
}
