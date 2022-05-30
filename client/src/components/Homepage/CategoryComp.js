import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/GlobalContext";
import dummyImage from "../../assets/1.png";

const CategroyComp = () => {
    const [{theme}] = useContext(ThemeContext);

    return (
        <div className="container-fluid home-cards-container">
            {/* row 1 */}
            <div className="row">
                <div className="col-md-3 home-card">
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}>
                        Gaming accessories
                        <div className="row">
                            <div className="col-md-6">
                                <img src={dummyImage} alt="" />
                                <p>Headset</p>
                            </div>
                            <div className="col-md-6">
                                <img src={dummyImage} alt="" />
                                <p>Keyboards</p>
                            </div>
                            <div className="col-md-6">
                                <img src={dummyImage} alt="" />
                                <p>Computer mice</p>
                            </div>
                            <div className="col-md-6">
                                <img src={dummyImage} alt="" />
                                <p>Chairs</p>
                            </div>
                            
                           
                        </div>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card" >
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}>
                        Shop by Category
                        <div className="row">
                            <div className="col-md-6">
                                <img src={dummyImage} alt="" />
                                <p>Headset</p>
                            </div>
                            <div className="col-md-6">
                                <img src={dummyImage} alt="" />
                                <p>Keyboards</p>
                            </div>
                            <div className="col-md-6">
                                <img src={dummyImage} alt="" />
                                <p>Computer mice</p>
                            </div>
                            <div className="col-md-6 ">
                                <img src={dummyImage} alt="" />
                                <p>Chairs</p>
                            </div>
                        </div>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                       
                    </div>
                </div>
                <div className="col-md-3 home-card" >
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}>
                        Electronics
                        <div className="row">
                            <div className="col-md-12">
                                <img src={dummyImage} alt="" />
                                <p>Headset</p>
                            </div>
                            
                        </div>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}>
                        <p>Sign in for the best experience</p>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                        
                    </div>

                </div>
            </div>
            {/* row 2 */}
            <div className="row">
                <div className="col-md-3 home-card">
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}>
                        <p>Shop Father's Day Gifts</p>
                        <div className="row">
                            <div className="col-md-6">1</div>
                            <div className="col-md-6">2</div>
                            <div className="col-md-6">3</div>
                            <div className="col-md-6">4</div>
                            
                        </div>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}> 
                        <p>Health & Personal Care</p>
                        <div className="row">
                            <div className="col-md-6">1</div>
                            <div className="col-md-6">2</div>
                            <div className="col-md-6">3</div>
                            <div className="col-md-6">4</div>
                            
                        </div>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                    </div>

                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}>
                        <p>Deal of the Day</p>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                    </div>

                </div>
                <div className="col-md-3 home-card">
                    <div className="card-content-container" style={{boxShadow:theme.boxShadow}}>
                        <p>Electronics</p>
                        <div className="c-a">
                            <Link to="/">Sign in securely</Link>
                        </div>
                    </div>

                </div>
            </div>
            {/* row 3 */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card-content-container-sub" style={{boxShadow:theme.boxShadow}}>
                        <p>Popular products in PC internationally</p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, nulla?
                    </div>
                </div>
            </div>
            {/* row 4 */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card-content-container-sub" style={{boxShadow:theme.boxShadow}}>
                        <p>Top Sellers in Books for you</p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, perspiciatis!
                    </div>
                </div>
            </div>
            {/* last row */}
            <div className="row">
                <div className="col-md-12">
                    <div className="home-sign-section" style={{boxShadow:theme.boxShadow}}>
                        <div>
                            See personalized recommendations
                        </div>
                        <div>
                            <button className="home-sign-but">Sign In</button>
                        </div>
                        
                        <p>New customer?<Link to="/"> Start here</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default CategroyComp;