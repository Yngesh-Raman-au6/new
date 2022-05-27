import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-dark text-muted" >
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
  <section
    className="d-flex justify-content-center justify-content-lg-between p-4 "

  >
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    <div>
      <a href="" className="me-4">
                        <FacebookRoundedIcon />
      </a>
                    <a href="" className="me-4 ">
                        <TwitterIcon />
      </a>
      <a href="" className="me-4 ">
                        <GoogleIcon />
      </a>
      <a href="" className="me-4 ">
                        <InstagramIcon />
      </a>
    </div>
  </section>
  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h5 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>{process.env.NEXT_PUBLIC_APP_NAME}
          </h5>
         
        </div>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
                                About
          </h6>
          <p>
                                <a href="#!" className="text-decoration-none">Terms of Service</a>
          </p>
          <p>
                                <a href="#!" className="text-decoration-none">Privacy Policy</a>
          </p>
          <p>
            <a href="#!" className="text-decoration-none">Contact</a>
          </p>
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 d-none d-lg-block">
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
                                <a href="#!" className="text-decoration-none">Profile</a>
          </p>
          <p>
                                <a href="#!" className="text-decoration-none">Withdraw</a>
          </p>
          <p>
                                <a href="#!" className="text-decoration-none">Help</a>
          </p>
        </div>
      </div>
    </div>
  </section>
            <div className="text-center p-4" >

                <span className="" >@ 2022 Copyright | {process.env.NEXT_PUBLIC_APP_NAME} | All Rights Reserved</span>
  </div>
  </div>
</footer>
        )
}

export default Footer;