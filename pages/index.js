import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../Components/Navbar'
import OfferWalls from '../Components/Offerwalls'
import Carousel from '../Components/Carousel'

export default function Home() {
    return (
        <>
            <Navbar />
            <Carousel />
            <div className="bg-dark">

                <h2 className="pt-5 px-5 fw-bold text-bright">Offer Walls</h2>
                <h6 className="text-white pt-2 px-5 fw-bold">Choose from the one to start earning coins ( 1000 Coins equals to $1 )</h6>
                <OfferWalls />

              


            </div>
        </>
            )
}
