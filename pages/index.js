import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../Components/Navbar'
import OfferWalls from '../Components/Offerwalls'
import Carousel from '../Components/Carousel'
import Tasks from '../Components/Tasks'
import axios from 'axios';

Home.getInitialProps = async (ctx) => {
    const res = await axios.get('https://wall.adgaterewards.com/apiv1/vc/oKuUpw/users/sds6d/offers');
    return { offers: res.data };
}

export default function Home({ offers }) {
    return (
        <>
            <Navbar />
            <Carousel />
            <div className="bg-dark">

                <h2 className="pt-5 px-5 fw-bold text-bright">Tasks</h2>
                <h6 className="text-white pt-2 px-5 fw-bold">Complete the task to earn coins.
                    You will be rewarded for each task completed. ( 1000 Coins equals to $1 )</h6>
                <Tasks offers={offers.data} />


                <h2 className="pt-5 px-5 fw-bold text-bright">Offer Walls</h2>
                <h6 className="text-white pt-2 px-5 fw-bold">Choose from the one to start earning coins ( 1000 Coins equals to $1 )</h6>
                <OfferWalls offers={offers.data} />

              


            </div>
        </>
            )
}
