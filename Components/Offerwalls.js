import NewWindow from 'react-new-window'


const Offerwalls = ({ offers }) => {

    const openTab = (url) => {
        var height = 570;
        var width = 520;
        var left = (screen.width / 2) - (width / 2);
        var top = (screen.height / 2) - (height / 2);
        window.open(url, '_blank',
            `location=yes,directories=no,resizable=yes,height=${height},toolbar=no,menubar=no,width=${width},scrollbars=yes,status=no,top=${top}, left=${left}`)
    }

    return (

        <div className="p-5">
            <div className="row row-cols-1 g-4 pb-5">

                <div className="col-lg-3">
                    <a onClick={() => openTab('https://wall.adgaterewards.com/oKuUpw/471109')}
                         className="card p-3 text-decoration-none">
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
                    <a onClick={() => openTab('https://fastrsrvr.com/list/471109')}
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
