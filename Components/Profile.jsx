import { removeCookies } from 'cookies-next';
import { Context } from '../context/Store'
import React, { useContext, useRef, useState } from "react";
import { Line, Chart } from "react-chartjs-2";
import axios from 'axios';
import { useRouter } from "next/router";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)



export default function Profile() {

    const router = useRouter();
    const [state, setState] = useContext(Context);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState(state.user.username);
    const closeBtnRef = useRef(null);

    const data = {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Coins",
                data: [2000, 2450, 3600, 3750, 5200, 3250, 2450, 1600, 2150, 2500],
                fill: true,
                backgroundColor: "white",
                borderColor: "lightgreen"
            },
        ]
    };

    const handleChangeUsername = async () => {
        setIsDisabled(true);
        const res = await axios.post('/api/user/changeUsername', { username: username, _id: state.user._id });
        if (res.data.success) {
            setState(prevState => ({
                ...prevState,
                ['user']: res.data.user,
            }));
        }
        setIsDisabled(false);
    };

    const handleDelete = async () => {

        setIsDisabled(true);
        setIsLoading(true);

        const res = await axios.post('/api/user/auth/delete', { _id: state.user._id });

        if (res.data.success) {
            setState(prevState => ({
                ...prevState,
                ['user']: null,
            }));
            closeBtnRef.current.click();
            router.push('/');
        }

        setIsDisabled(false);
        setIsLoading(false);

    };

    return (
        <section className="bg-dark pb-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card border-0 mb-4">
                            <div className="card-body bg-dark  text-center ">
                                <img src={!state.user.photoUrl ? `https://plusvalleyadventure.com/wp-content/uploads/2020/11/default-user-icon-8.jpg` : state.user.photoUrl}
                                    alt="avatar"
                                    className="rounded-circle img-fluid" style={{ width: "80px" }} />
                                <div className="d-flex py-3 justify-content-center mb-2">
                                    <h3 className="text-bright">{state.user.username}</h3>
                                </div>
                                <p className="text-white mb-1">
                                    Completed Offers : <strong className="text-bright">0</strong></p>
                                <p className="text-white mb-1">
                                    Coins Earned : <strong className="text-bright">{state.user.coins}</strong></p>

                            </div>
                        </div>
                        <div className="card border-0 mb-4 mb-lg-0">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush justify-content-start rounded-3">
                                    <li className="list-group-item blue p-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="mb-0">Userid</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="mb-0 mx-3 text-bright float-end ">{state.user._id}</p>
                                            </div>
                                        </div>

                                    </li>
                                    <li className="list-group-item lightgray p-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="mb-0">Balance : </p>
                                            </div>

                                            <div className="col-6">
                                                <p className="mb-0 mx-3 text-bright float-end ">{state.user.coins}</p>
                                            </div>
                                        </div>

                                    </li>

                                    <li className="list-group-item blue  p-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="mb-0">UPI Linked</p>
                                            </div>
                                            <div className="col-6">
                                                {!state.user?.UpiAddress ?
                                                    <p className="mb-0 mx-3 text-white float-end bg-danger px-2 rounded-1">No</p> :
                                                    <p className="mb-0 mx-3 text-white float-end bg-success px-2 rounded-1">{state.user.UpiAddress}</p>}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item lightgray p-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="mb-0">Date Joined:</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="mb-0 mx-3 text-bright float-end">{state.user.created}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item blue p-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="mb-0 mx-3 text-bright float-end">{state.user.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <Line className="card" data={data} />
                        <div className="row">
                            <div className="col-md-12 mt-5">
                                <div className="card border-0 mb-4 mb-md-0">
                                    <div className="card-body bg-dark">
                                        <p className="text-default mt-4 mb-2 text-end">Change Display Name</p>
                                        <div className="input-group mb-3">
                                            <input type="text" className="border-top-0 border-start-0 px-5 fs-4 fw-normal form-control text-bright"
                                                style={{ background: 'none' }}
                                                placeholder="Enter a username"
                                                value={username}
                                                maxLength="7"
                                                onChange={(e) => setUsername(e.target.value)}
                                                aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text rounded-0 btn btn-success btn-lg text-white" id="basic-addon2"
                                                onClick={handleChangeUsername} disabled={isDisabled}>Change</span>
                                        </div>

                                        <p className="text-default mt-4 mb-2 text-end">Delete Account</p>
                                        <button data-bs-toggle="modal" data-bs-target="#deleteModal" className="btn btn-danger btn-lg float-end rounded-0">Delete Account</button>

                                        <div className="modal fade  modal-sheet  py-5" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" role="dialog">
                                            <div className="modal-dialog modal-lg" role="document">
                                                <div className="modal-content  bg-dark rounded-4 shadow">
                                                    <div className="modal-header border-bottom-0">
                                                        <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                                                        <button type="button" ref={closeBtnRef} className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body py-0 text-default">
                                                        <p>Do you want to delete your account? This process is irreversible.</p>
                                                    </div>
                                                    <div className="modal-footer flex-column border-top-0 px-5 mx-5">
                                                        <div className="container px-lg-5">
                                                            <button onClick={handleDelete} type="button" className="btn btn-lg btn-danger w-100 mb-2" disabled={isDisabled}>
                                                                {isLoading ? (<div className="spinner-border text-light" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>) : `Delete`
                                                                }
                                                            </button>
                                                            <button type="button" className="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}