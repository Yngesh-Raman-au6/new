import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Context } from '../context/Store'
import { useContext, useEffect, useState } from 'react';

const Offerwalls = () => {

    const [state, setState] = useContext(Context);

    useEffect(() => {
        window.open(state.offerUrl, "theFrame");
    },[])

    const openTab = async (url, offerwallTitle) => {

        await setState(prevState => ({
            ...prevState,
            ['offerTitle']: offerwallTitle,
            ['offerUrl']: url
        }));

        await window.open(url, "theFrame");
    }

    return (

        <div className="p-5">

            {/* Task Model */}
            <div className="modal fade" id="offerWallModel"
                tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header modal-header-bg" style={{ backgroundColor: 'rgb(34,35,57)' }}>
                            <h5 className="modal-title text-white" id="exampleModalLabel">
                                {state.offerTitle}
                                <a href={state.offerUrl} rel="noreferrer" className="text-white"
                                    target="_blank" ><OpenInNewIcon className="mb-1 mx-2" fontSize="small" />
                                </a>
                            </h5>
                            <button type="button" className="btn-close bg-light"
                                data-bs-dismiss="modal" aria-label="Close" onClick={() => openTab( '/loading','Lucky Offer')}></button>
                        </div>
                        <iframe className={`modal-body mx-auto px-0 py-0 `} name="theFrame"
                            height="570" width="100%"  />

                    </div>
                </div>
            </div>

            <div className="row row-cols-1 g-4 pb-5">

                <div className="col-lg-3">
                    <a onClick={() => openTab('https://wall.adgaterewards.com/oKuUpw/471109', 'Adgate Media')}
                        className="card p-3 text-decoration-none" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#offerWallModel">

                        <div className="card bg-dark text-white">
                            <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5bddd30afbd6140001fa4ffb/0x0.png" className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Popularity <img src="https://img.icons8.com/color/30/000000/india.png" /> : 50</h5>
                                <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar progress-bar-striped progress-bar-animated w-50"
                                        role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                        aria-valuemax="100" ></div>
                                </div>
                                <h5 className="card-title text-center mt-5 fw-bolder">Adgate media</h5>
                            </div>
                        </div>
                    </a>

                </div>
                <div className="col-lg-3">

                    <a style={{ cursor: "pointer" }} onClick={() => openTab('https://fastrsrvr.com/list/471109', 'CPA Leads')}
                        data-bs-toggle="modal" data-bs-target="#offerWallModel"
                        className="card p-3 h-100 text-decoration-none">


                        <div className="card bg-dark text-white">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/61onWbZBZSL.png"
                                className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Popularity <img src="https://img.icons8.com/color/30/000000/india.png" /> : 75</h5>
                                <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar progress-bar-striped progress-bar-animated w-75"
                                        role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                        aria-valuemax="100" ></div>

                                </div>
                                <h5 className="card-title text-center mt-5 fw-bolder">CPA Leads</h5>

                            </div>
                        </div>
                    </a>

                </div>



            </div>
        </div>
    )
}


export default Offerwalls;
