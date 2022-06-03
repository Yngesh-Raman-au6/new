import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Store'
import axios from 'axios';

export default function TransferFund() {
    const [state, setState] = useContext(Context);

    const [isSuccess, setisSuccess] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [isDisabled, setisDisabled] = useState(true);
    const [amount, setamount] = useState("");
    const [balance, setbalance] = useState((state.user?.coins / 1000).toFixed(2));


    useEffect(() => {
        var int_balance = parseFloat(balance);
        var int_amount = parseFloat(amount);

        console.log(int_balance)

        if (int_balance >= int_amount && int_amount >= 1) {
            setisDisabled(false);
        }
        else {
            setisDisabled(true);
        }
    }, [amount])

    const SuccessComponent = ({ message, type }) => {
        return (
            <div className='col-md-6'>
                <div class={`alert alert-${type}`} role="alert">
                    <h4 class="alert-heading">{type === 'success' ? `Transaction Successfull` : `Transaction Failed`}</h4>
                    <p className='my-5'>{message}</p>
                    <hr />
                    <Link href="/">
                        <button className={`btn btn-${type}`}> Return Home</button>
                    </Link>

                </div>
            </div >
        )
    };

    const handleSubmit = async () => {
        setisLoading(true);
        setisDisabled(true);

        const payload = { id: state.user?._id, amount: amount }

        const res = await axios.post('/api/payment/payout', payload);
        const data = res.data;

        if (data.success) {
            setisSuccess({ message: data.message, type: 'success' });
            setState(prevState => ({
                ...prevState,
                ['user']: data.user,
            }));
        }
        else if (!data.success) {
            setisSuccess({ message: data.message, type: 'danger' });
        }
        setisLoading(false);
        setisDisabled(false);
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            {!isSuccess ?
                <div className="card px-4 py-2">
                    <div>
                        <div className="d-flex pt-2 pl-3">
                            <div className="mt-3 pl-2 my-3">
                                <div><img src="https://img.icons8.com/fluency/48/undefined/bhim.png" className='my-2' /></div>
                                <div className=''>
                                    <span className="name "><small>{state.user?.UpiAddress}</small></span>
                                </div>
                                <div>
                                    <span className="cross text-bright">Balance: $ </span>
                                    <span className="pin ml-2 text-bright">{balance}</span>
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
                                <div className="border-left pl-2">
                                    <span className="head">Other amount</span>
                                    <div className="d-flex"><span className="dollar fs-4 mx-1">$</span>
                                        <input type="number" name="text" className="form-control ml-1 fs-4 py-0 mt-1"
                                            placeholder="0"
                                            value={amount}
                                            onChange={(e) => setamount(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-success col-10 mt-4 py-2 mx-3" role="alert">
                            Cost: <strong> {amount * 1000} C</strong>
                        </div>

                        <div className="d-flex justify-content-between px-3 pt-4 pb-3">
                            <Link href="/cashout"><div className='pointer'><span className="back">Go back</span></div></Link>

                            {isLoading ? (<div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>) : (<button type="button" className="btn btn-primary button" onClick={handleSubmit}
                                disabled={isDisabled}>Continue</button>)
                            }

                        </div>
                    </div>
                </div>
                : <SuccessComponent message={isSuccess.message} type={isSuccess.type} />
            }

        </div >
    )
}
