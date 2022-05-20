const Offerwalls = ({ offers }) => {
    return (
        <div className="p-5">
        <div className="row row-cols-1 row-cols-md-6 g-4">
                {offers.map((offer) => {
                    return (
                        offer.categories.includes('Apps') &&
                    <div key={offer.id } className="col">
                            <a href={offer.click_url} rel="noreferrer"  target="_blank" className="card p-3 h-100 text-decoration-none">
                            <div className="card-body  shadow-sm rounded">
                            <img src={offer.icon_url} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h6 className="card-title text-white text-center">{offer.anchor}</h6>
                            </div>
                            </div>
                        </a>

                    </div>
                    )
            })}
            

        </div>
        </div>
    )
}


export default Offerwalls;