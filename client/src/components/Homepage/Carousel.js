import { useNavigate } from "react-router-dom";


const HomeCarouselComponent = () => {
    let navigate = useNavigate()
    const regularNavigate = (p) => {
        navigate(p)
    }

    return (
        <div className="">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                

                
                <div className="carousel-inner">
                    <div className="carousel-item caro-1 active">
                        <div className="caro-1-content">
                            <h5>Shop Computers <br></br>
                                & Accessories</h5>
                            <button onClick={() => regularNavigate("/products?category=computers-accessories")}>See more<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                            </svg></button>
                        </div>

                    </div>
                    <div className="carousel-item caro-2">
                        <div className="caro-2-content ">
                            <div className="row">
                                <div className="col-md-7">

                                </div>
                                <div className="col-md-5">
                                    <div>
                                        <h5>Discover beauty selections</h5>
                                    </div>

                                    <button onClick={() => regularNavigate("/products?category=beauty")}>See now<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                    </svg></button>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="carousel-item caro-3">
                        <div className="caro-3-content">
                            <h5>Shop Toys & Games</h5>
                            <button onClick={() => regularNavigate("/products?category=toys-games")}>See more<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                            </svg></button>
                        </div>

                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default HomeCarouselComponent;