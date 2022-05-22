import Head from 'next/head'

export default function Loading() {
    return (
        <>
            <Head>
                <title>Lucky Offer</title>
            </Head>
            <div className="loader-wrapper">
                <div className="container">
                    <div className="box1"></div>
                    <div className="box2"></div>
                    <div className="box3"></div>
                </div>
                </div>
        </>
    )
}
