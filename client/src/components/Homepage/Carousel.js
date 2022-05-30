import dummyImag1 from "../../assets/1.png";
import dummyImage2 from "../../assets/2.png";
import dummyImage3 from "../../assets/3.png";
import { Link } from "react-router-dom";

const HomeCarouselComponent = () => {

    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={dummyImag1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={dummyImage2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={dummyImage3} className="d-block w-100" alt="..." />
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
    )
}

export default HomeCarouselComponent;