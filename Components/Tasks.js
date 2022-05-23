import { Context } from '../context/Store'
import { useContext, useState } from 'react';

const Tasks = ({ offers }) => {


    const [state, setState] = useContext(Context);

    const openTab = async (url, offerwallTitle) => {
        
        await setState(prevState => ({
            ...prevState,
            ['offerTitle']: offerwallTitle,
            ['offerUrl']: url
        }));

        await window.open(url, "theFrame");

    }

    const [offerSize, setOfferSize] = useState(12);

    return (

        <div className="p-5">

            <div className="row row-cols-1 g-4 pb-5">
                {offers.data.slice(0, offerSize).map((task) => {
                    return (
                        <div className="col-lg-3" key={task.id}>

                            <a style={{ cursor: "pointer" }}
                                onClick={() => openTab(task.click_url, task.anchor)}
                                data-bs-toggle="modal" data-bs-target="#offerWallModel"
                                className="card p-3 h-100 text-decoration-none">


                                <div className="card-body  shadow-sm rounded">
                                    <img src={task.icon_url} className="card-img-top h-50" alt="..." />
                                    <div className="card-body text-center">
                                        <div className="badge bg-primary text-wrap" >
                                            <span className="position-absolute top-0 
start-100 translate-middle badge rounded-pill bg-danger text-white fs-6">
                                                {task.flatPoints} C
                                                <span className="visually-hidden">unread messages</span>
                                            </span>
                                        <h6 className="card-title text-white text-center">{task.anchor}</h6>
                                        </div>
                                        <p className="card-title text-white text-center mt-4 p-0" style={{ fontSize: '12px' }}>
                                            {task.description}
                                        </p>

                                    </div>
                                </div>
                            </a>

                        </div>
                        )
                })}
              


                <div className="d-flex justify-content-center mt-5">
                    <button type="button" className="btn btn-primary  btn-lg" onClick={() => setOfferSize(offerSize+8)}>Load More</button>
                </div>
            </div>
        </div>
    )
}


export default Tasks;
