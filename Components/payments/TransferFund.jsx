import Link from 'next/link';
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context/Store'

export default function TransferFund() {

    const [state, setState] = useContext(Context);

    useEffect(() => {
        console.log(state.user)
    }, [])

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card px-4 py-2">

                <div>
                    <div className="d-flex pt-2 pl-3">
                        <div className="mt-3 pl-2 my-3">
                            <div><img src="https://img.icons8.com/ios-filled/50/000000/visa.png" width="60" height="80" /></div>
                            <div className=''>
                                <span className="name "><small>{state.user?.UpiAddress}</small></span>
                            </div>
                            <div>
                                <span className="cross text-bright">Balance: $ </span>
                                <span className="pin ml-2 text-bright">{(state.user?.coins / 1000).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>


                    <div className="py-2  px-3">
                        <div className="first pl-2 d-flex py-2">
                            <div className="form-check">
                                <input type="radio" name="optradio" className="form-check-input mt-3 dot" />
                            </div>
                            <div className="border-left pl-2"><span className="head">Total balance amount</span>
                                <div><span className="dollar fs-5">$ </span><span className="amount fs-5">{(state.user?.coins / 1000).toFixed(2)}</span></div></div>

                        </div>
                    </div>


                    <div className="py-2 px-3">
                        <div className="second pl-2 d-flex col-md-8">
                            <div className="form-check">
                                <input type="radio" name="optradio" className="form-check-input mt-3 dot" checked />
                            </div>
                            <div class="border-left pl-2">
                                <span class="head">Other amount</span>
                                <div class="d-flex"><span class="dollar fs-4 mx-1">$</span>
                                    <input type="number" name="text" class="form-control ml-1 fs-4 py-1 mt-1" placeholder="0" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="d-flex justify-content-between px-3 pt-4 pb-3">
                        <Link href="/cashout"><div className='pointer'><span className="back">Go back</span></div></Link>

                        <button type="button" className="btn btn-primary button">Continue</button>
                    </div>



                </div>
            </div>

        </div >
    )
}
