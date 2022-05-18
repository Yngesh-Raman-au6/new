import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RecommendIcon from '@mui/icons-material/Recommend';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark " >
            <div className="container my-3">
                <a className="navbar-brand " href="#">LuckyOffer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
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
                                Leaderboard <span className="badge bg-success text-white opacity-100 fw-light">$500 Daily</span></a>
                            </li>
      </ul>
                        <form className="d-flex" role="search">
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
</nav>)
}

export default Navbar;