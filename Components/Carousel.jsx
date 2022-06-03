import axios from 'axios';
import { useState, useEffect } from 'react';

const Carousel = () => {

    const [randomUsers, setRandomUsers] = useState([]);

    useEffect(() => {
        if (randomUsers.length <= 8) {
            getRandomUser();
        }
    }, [randomUsers])


    const getRandomUser = async () => {
        const res = await axios.get('https://randomuser.me/api/');
        const user = await res.data.results;
        const newUsers = [...randomUsers, user[0]];
        await setRandomUsers(newUsers);
    }


    return (
        <div className="container-fluid py-3 d-none d-lg-block carousel">
            <div className="row align-items-start ">
                {randomUsers.map((user) => {
                    return (
                        <div key={user.login.uuid} className="col mx-0 px-3">
                        <button className="btn btn-sm btn-lightgray border-0 fw-semibold text-bright fs-8"
                                stype="button" aria-expanded="false">
                                <a href="#" tabIndex="-1"
                                    className="btn px-lg-3 py-lg-3 mx-1 disabled text-light"
                                    aria-hidden="true" style={{
                                        background: `url(${user.picture.medium})`,
                                        backgroundSize: "100% 100%"
                                    }}>
                                </a>
                                {user.login.username.substring(0, 7)}
                        </button>
                    </div>)
                })};
            </div>
        </div>
        )
};

export default Carousel;