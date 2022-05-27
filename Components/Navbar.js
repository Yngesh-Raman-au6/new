import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RecommendIcon from '@mui/icons-material/Recommend';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Link from 'next/link'
import { Context } from '../context/Store'
import { useContext } from "react";
import { removeCookies } from 'cookies-next'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const Navbar = () => {
    const [state, setState] = useContext(Context);
    const router = useRouter();

    const handleLogout = async () => {
        removeCookies('refreshToken');
        setState(prevState => ({
            ...prevState,
            ['user']: null,
        }));
        router.push('/')
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark " >
            <div className="container py-2">
                <Link href="/" passHref>
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
                            <Link href="/" passHref>
                            <a className="nav-link active fw-semibold" aria-current="page" href="#">
                                    <RecommendIcon className="navicon" fontSize="large" /> Earn</a>
                            </Link>
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

                    <motion.div className={state.user && `d-none`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0, duration: 0.7 }}
                    >
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
                    </motion.div>

                    {state.user && ( 
                        <form className="d-flex" role="search">
                            <div className="dropdown">
                                <button className="btn btn-lightgray border-0 fs-7 dropdown-toggle fw-semibold text-white"
                                    stype="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                
                                >
                                    <a href="#" tabIndex="-1"
                                        className={`btn ${!state.user.photoUrl && `bg-danger`} border-0 px-3 disabled placeholder text-light text-uppercase`}
                                        style={{ backgroundImage: `url(${state.user.photoUrl})`, backgroundSize: '100% 100%' }}
                                        aria-hidden="true">{!state.user.photoUrl && (state.user.username).charAt(0)}</a>
                                    <span className="text-white mx-2">{state.user.username}</span>
                                    <button className="btn fs-5 m-1 fw-bold text-bright p-2 bg-dark" disabled>
                                        {state.user.coins} C
                                    </button>

                                </button>


                                <ul className="dropdown-menu dropdown-menu-dark text-light gap-1 p-2 rounded-3 mx-0 border-0 shadow w-220px"
                                    aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item rounded-2 pointer" >Affiliate</a></li>
                                    <li><Link href="/account"><a className="dropdown-item rounded-2 pointer" >Profile</a></Link></li>
                                    <li><a className="dropdown-item rounded-2 pointer" >Explore</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item rounded-2 pointer" onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </form>
                        )
                    }
                </div>
            </div>
        </nav>

    )
}

export default Navbar;