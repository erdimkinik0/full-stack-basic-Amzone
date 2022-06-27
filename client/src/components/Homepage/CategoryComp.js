import { Link, useNavigate } from "react-router-dom";

import headset from "../../assets/headset.png";
import keyboard from "../../assets/keyboard.png"
import mouse from "../../assets/mouse.png"
import fotel from "../../assets/fotel.png"
import laptop from "../../assets/laptop.png"
import toy from "../../assets/toy.png"
import tshirt from "../../assets/tshirt.png"
import mop from "../../assets/mop.png"
import hardware from "../../assets/ram-home.png"
import compsAccs from "../../assets/comps-accs.jpg"
import personalCare from "../../assets/personal-care.jpg"
import dresses from "../../assets/dresses.jpg"

import MySlider from "./SlickSlider";
import PopularSlider from "./PopularSlider";
import { useEffect, useState } from "react";




const CategroyComp = (props) => {
    let navigate = useNavigate()
    const onClickedHandler = (url) => {
        navigate(url);
    }

    const [deal, setDeal] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            let res = await fetch("http://localhost:5000/products/discounts");
            if (res.status === 200) {
                let resJson = await res.json();
                setDeal(resJson[0])
            }
        }
        fetchData();
    }, [])
    console.log(deal)


    return (
        <div className="container-fluid home-cards-container">
            {/* row 1 */}
            <div className="row">
                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Gaming accessories</h3>
                        <div className="row">
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=headset" ><img src={headset} alt="" /></Link>
                                <p>Headset</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=keyboard" ><img src={keyboard} alt="" /></Link>
                                <p>Keyboards</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=computer mice" ><img src={mouse} alt="" /></Link>
                                <p>Computer mice</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=chair" ><img src={fotel} alt="" /></Link>
                                <p>Chairs</p>
                            </div>


                        </div>
                        <div className="c-a">
                            <Link to="/products">See more</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card " >
                    <div className="card-content-container">
                        <h3>Shop by Category</h3>
                        <div className="row">
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=laptop" ><img src={laptop} alt="" /></Link>
                                <p>Laptops</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=toy and game" ><img src={toy} alt="" /></Link>
                                <p>Toys</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=tshirts" ><img src={tshirt} alt="" /></Link>
                                <p>Clothes</p>
                            </div>
                            <div className="col-md-6 card-image">
                                <Link to="/products?category=household goods" ><img src={mop} alt="" /></Link>
                                <p>Household goods</p>
                            </div>
                        </div>
                        <div className="c-a">
                            <Link to="/products">Shop now</Link>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 home-card" >
                    <div className="card-content-container">
                        <h3>Hardware</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics">
                                <Link to="/products?category=computer hardware" ><img src={hardware} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/products?category hardware">Shop now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card last-tp-home">
                    <div className="card-content-container sign-side" >
                        <div>

                            <div onClick={(e) => onClickedHandler("/login")} className="row sign-right ">
                                <div className="col-md-12 card-image">
                                    <h2 style={{cursor:"pointer"}}>Sign in for the best experience</h2>
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
                                <Link to="/products?category=beauty and health care" ><img src={personalCare} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/products?category=beauty and health care">Shop now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Computers & Accessories</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics second-cont">
                                <Link to="/products?category=computers and accessories" ><img src={compsAccs} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/products?category=computers and accessories">Shop now</Link>
                        </div>
                    </div>

                </div>
                {
                    deal &&
                    <div className="col-md-3 home-card">
                        <div className="card-content-container">
                            <h3>Deal of the Day</h3>
                            <div className="row">
                                <div className="col-md-12 card-image electronics second-cont">
                                    <Link to={`/products/${deal._id}/detail`} ><img src={`http://localhost:5000/${deal.img}`} alt="dummy" /></Link>
                                </div>

                            </div>
                            <div className="c-a">
                                <Link to="/products?discounts=discounts">See all deals</Link>
                            </div>
                        </div>

                    </div>

                }

                <div className="col-md-3 home-card">
                    <div className="card-content-container">
                        <h3>Dresses</h3>
                        <div className="row">
                            <div className="col-md-12 card-image electronics second-cont">
                                <Link to="/products?category=dresses" ><img src={dresses} alt="" /></Link>
                            </div>

                        </div>
                        <div className="c-a">
                            <Link to="/products?category=dresses">Shop now</Link>
                        </div>
                    </div>

                </div>
            </div>
            {/* row 3 */}
            <h3 className="slider-title">Best Seller Products</h3>
            <div className="row">
                <div className="col-md-12">
                    <div className="card-content-container-sub" >
                        <MySlider onQuantityChangeHandler={props.onQuantityChangeHandler} addItemtoCart={props.addItemtoCart} />
                    </div>
                </div>
            </div>
            <h3 className="slider-title">Popular Deals</h3>
            {/* row 4 */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card-content-container-sub" >
                        <PopularSlider onQuantityChangeHandler={props.onQuantityChangeHandler} addItemtoCart={props.addItemtoCart}/>
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
                            <button onClick={(e) => {e.preventDefault(); onClickedHandler("/login")}} className="home-sign-but">Sign In</button>
                        </div>
                        <p className="d-sign">New customer? <Link to="/register/customer"> Start here.</Link></p>
                    </div>
                </div>
            </div>



        </div>
    )
}


export default CategroyComp;