import Link from "next/link";
import AuthModel from "../../Components/AuthModel";
import Navbar from "../../Components/Navbar";
import React from "react";
import Image from "next/image";

CashOut.getInitialProps = ctx => {

    if (ctx.res) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
    }
    return {};
}

export default function CashOut() {

    return (
        <div className="bg-dark" style={{ height: '100vh' }}>
            <Navbar />
            <AuthModel />

            <div className="d-flex col-md-8 container my-5 justify-content-center">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col pointer">
                        <div className="card border-0 text-bg-primary mb-3 h-100" >
                            <div className="card-header"><h5 className="text-white fw-bold">Bank Transfer</h5></div>
                            <div className="card-body my-4">
                                <p className="card-text">
                                    Transfer money to your bank account.

                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href="/cashout/vpa">
                        <div className="col pointer">
                            <div className="card  border-0 h-100 text-bg-light mb-3" >
                                <div className="card-header">
                                    <h5 className="text-dark fw-bold"> UPI Transfer</h5>
                                </div>
                                <div className="card-body my-0">
                                    <Image src="/utils/upi.png" height={65} width={75} priority />
                                    <p className="card-text">
                                        Receive money directly on your vpa address

                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="col pointer">
                        <div className="card text-bg-danger mb-3 border-0 h-100" >
                            <div className="card-header"><h5 className="text-white fw-bold">Gift Card</h5></div>
                            <div className="card-body my-4">
                                <p className="card-text">Create a gift card </p>
                            </div>
                        </div>
                    </div>
                    <div className="col pointer">
                        <div className="card text-bg-warning mb-3 border-0 h-100" >
                            <div className="card-header"><h5 className="text-white fw-bold">Bitcoin</h5></div>
                            <div className="card-body my-4">
                                <p className="card-text">
                                    Get bitcoin transferred to your wallet
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}