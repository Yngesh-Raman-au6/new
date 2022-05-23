import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RecommendIcon from '@mui/icons-material/Recommend';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Link from 'next/link'
import { Context } from '../context/Store'
import { useContext } from "react";

const Navbar = () => {
    const [state, setState] = useContext(Context);

    return (
        <nav className="navbar navbar-expand-lg bg-dark " >
            <div className="container py-2">
                <Link href="/" >
                    <a className="navbar-brand " href="#" >{process.env.NEXT_PUBLIC_APP_NAME}</a>
                </Link>

                <button className="navbar-toggler bg-white opacity-25" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Items */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item px-lg-3">
                            <a className="nav-link active fw-semibold" aria-current="page" href="#">
                                <RecommendIcon className="navicon" fontSize="large" /> Earn</a>
                        </li>

                        <li className="nav-item px-lg-3">
                            <a className="nav-link  fw-semibold" href="#">
                                <LocalAtmIcon className="navicon" fontSize="large" /> Cashout</a>
                        </li>

                        <li className="nav-item px-lg-3">
                            <a className="nav-link fw-semibold">

                                <EmojiEventsIcon className="navicon" fontSize="large" />
                                Leaderboard <span className="badge bg-success text-bright opacity-100 fw-light">$500 Daily</span></a>
                        </li>
                    </ul>

                    <button className="btn mx-3 btn-lightgray border-0 fw-semibold fs-6 text-white"
                        data-bs-toggle="modal" data-bs-target="#authModel"

                        onClick={
                            () =>
                        setState(prevState => ({
                        ...prevState,
                        ['modelSignIn']: true,
                        }))
                        }
                    >
                        <a href="#" tabIndex="-1" className="btn px-1 mb-1 border-0 disabled text-light"
                            aria-hidden="true">
                            <PersonOutlineOutlinedIcon fontSize="small" />
                        </a>  Sign in
                    </button>

                    <button className="btn mx-3 btn-success border-0 fw-semibold fs-6 text-white"
                        data-bs-toggle="modal" data-bs-target="#authModel" onClick={() =>
                            setState(prevState => ({
                                ...prevState,
                                ['modelSignIn']: false,
                            }))}>
                        <a href="#" tabIndex="-1" className="btn btn-success px-1 mb-1 border-0 disabled text-light"
                            aria-hidden="true">
                            <VpnKeyIcon fontSize="small" />
                        </a>  Sign up
                    </button>

                    

                    <form className="d-flex d-none" role="search">
                        <div className="dropdown">
                            <button className="btn btn-lightgray border-0 dropdown-toggle fw-semibold text-white"
                                stype="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <a href="#" tabIndex="-1" className="btn btn-danger px-3 disabled placeholder text-light" aria-hidden="true">S</a>  User
                            </button>

                            <ul className="dropdown-menu dropdown-menu-dark text-light gap-1 p-2 rounded-3 mx-0 border-0 shadow w-220px"
                                aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item rounded-2 " href="#">Affiliate</a></li>
                                <li><a className="dropdown-item rounded-2" href="#">Profile</a></li>
                                <li><a className="dropdown-item rounded-2" href="#">Explore</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item rounded-2" href="#">Logout</a></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;