import Head from 'next/head'
import Navbar from '../Components/Navbar'
import OfferWalls from '../Components/Offerwalls'
import Tasks from '../Components/Tasks'
import Carousel from '../Components/Carousel'
import axios from 'axios'


Home.getInitialProps = async () => {
    const url = `https://wall.adgaterewards.com/apiv1/vc/oKuUpw/users/dwder34/offers?country_code=IN`
    const res = await axios.get(url);
    return { offers: res.data }
}

export default function Home({ offers }) {
    return (
        <>
            <Head>
                <title>Lucky Offer</title>
                </Head>
            <Navbar />
            <Carousel />
            <div className="bg-dark">

                <h2 className="pt-5 px-5 fw-bold text-bright">Offer Walls</h2>
                <h6 className="text-white pt-2 px-5 fw-bold">Choose from the one to start earning coins ( 1000 Coins equals to $1 )</h6>
                <OfferWalls />

                <h2 className="pt-3 px-5 fw-bold text-bright">Tasks</h2>
                <h6 className="text-white pt-2 px-5 fw-bold">Complete any of the task below to earn coins ( 1000 Coins equals to $1 )</h6>
                <Tasks offers={offers} />


            </div>
        </>
            )
}
