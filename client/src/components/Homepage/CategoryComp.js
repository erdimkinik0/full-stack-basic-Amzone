import { Link, useNavigate } from "react-router-dom";

import dummyImage from "../../assets/1.png"
import headset from "../../assets/headset.png";
import keyboard from "../../assets/keyboard.png"
import mouse from "../../assets/mouse.png"
import fotel from "../../assets/fotel.png"
import laptop from "../../assets/laptop.png"
import toy from "../../assets/toy.png"
import tshirt from "../../assets/tshirt.png"
import mop from "../../assets/mop.png"
import hardware from "../../assets/hardware.png"
import compsAccs from "../../assets/comps-accs.jpg"
import personalCare from "../../assets/personal-care.jpg"
import dresses from "../../assets/dresses.jpg"

import MySlider from "./SlickSlider";




const CategroyComp = (props) => {
    let navigate = useNavigate()
    const onClickedHandler = (url) => {
        navigate(url);
    }


    return (
        <div className="container-fluid home-cards-container">
            {/* row 1 */}
            <div className="row">
                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Gaming accessories</h3>
                        <div className="row">
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={headset} alt="" /></Link>
                                <p>Headset</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={keyboard} alt="" /></Link>
                                <p>Keyboards</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={mouse} alt="" /></Link>
                                <p>Computer mice</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={fotel} alt="" /></Link>
                                <p>Chairs</p>
                            </div>


                        </div>
                        <div className="c-a">
                            <Link to="/">See more</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card " >
                    <div className="card-content-container">
                        <h3>Shop by Category</h3>
                        <div className="row">
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={laptop} alt="" /></Link>
                                <p>Laptops</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={toy} alt="" /></Link>
                                <p>Toys</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={tshirt} alt="" /></Link>
                                <p>Clothes</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/" ><img src={mop} alt="" /></Link>
                                <p>Household goods</p>
                            </div>
                        </div>
                        <div className="c-a">
                            <Link to="/">Shop now</Link>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 home-card" >
                    <div className="card-content-container">
                        <h3>Electronics</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics">
                                <Link to="/" ><img src={hardware} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/">Shop now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card last-tp-home">
                    <div className="card-content-container sign-side" >
                        <div>
                            
                            <div onClick={(e) => onClickedHandler("/login")} className="row sign-right ">
                                <div className="col-md-12 card-image">
                                    <h2>Sign in for the best experience</h2>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* row 2 */}
            <div className="row">
                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Health & Personal Care</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics second-cont">
                                <Link to="/" ><img src={personalCare} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/">Shop now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Computers & Accessories</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics second-cont">
                                <Link to="/" ><img src={compsAccs} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/">Shop now</Link>
                        </div>
                    </div>

                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Deal of the Day</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics second-cont">
                                <Link to="/" ><img src={dummyImage} alt="dummy" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/">See all deals</Link>
                        </div>
                    </div>

                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Dresses</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics second-cont">
                                <Link to="/" ><img src={dresses} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/">Shop now</Link>
                        </div>
                    </div>

                </div>
            </div>
            {/* row 3 */}
            <h3 className="slider-title">Best Seller Products</h3>
            <div className="row">
                <div className="col-md-12">
                    <div className="card-content-container-sub" >
                    <MySlider onQuantityChangeHandler={props.onQuantityChangeHandler} addItemtoCart={props.addItemtoCart}/>
                    </div>
                </div>
            </div>
            <h3 className="slider-title">Best Seller Computer & Accessories</h3>
            {/* row 4 */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card-content-container-sub" >
                    <MySlider />
                    </div>
                </div>
            </div>
            
           
            {/* last row */}
            <div className="row">
                <div className="col-md-12">
                    <div className="home-sign-section" >
                        <div>
                            See personalized recommendations
                        </div>
                        <div>
                            <button className="home-sign-but">Sign In</button>
                        </div>
                        <p className="d-sign">New customer? <Link to="/"> Start here.</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default CategroyComp;