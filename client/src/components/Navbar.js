import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from "../hooks/GlobalContext"


const Navbar = (props) => {
    const [{ isDark }, toggleTheme] = useContext(ThemeContext);
    let navigate = useNavigate();

    const tokenRefreshClickHandler = async (path) => {
        try {
            
            let res = await fetch("http://localhost:4000/token", {
                method: "post",
                body: JSON.stringify(props.refreshToken),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (res.status === 200) {
                let newTokenJson = await res.json();
                localStorage.setItem("accessToken", newTokenJson.accessToken);
                props.setAccessToken({
                    token:newTokenJson.accessToken
                })
                localStorage.setItem("setupTime",new Date().getTime())
                navigate(`${path}`)
            }
            else {
                let errMessage = await res.json();
                navigate(`/login`);
                console.log(errMessage);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const logoutClickHandler = async (e) => {
        try {
            e.preventDefault();
            await fetch("http://localhost:4000/logout", {
                method:"delete",
                body: JSON.stringify(props.refreshToken),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            props.setIsLogged(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("setupTime")
            localStorage.removeItem("userType")
            navigate("/");
           
        } catch (err) {
            console.log(err);
        }
    }

    const regularRouteHandler = (path) => {
        navigate(`${path}`)
    }

    


    return (
        <div className="nav-container">
            <div className="container-fluid">
                <div className="top-nb">
                    <div className="row d-flex mt-1">
                        <div className="col-md-1">
                            <button onClick={(e) => {
                                e.preventDefault();
                                regularRouteHandler("/")
                                }}>Logo</button>
                        </div>
                        <div className="col-md-9">
                            <button onClick={(e) => {
                                e.preventDefault();
                                tokenRefreshClickHandler("/")
                                }}>Dropdown Menu</button>
                                
                                {
                                    props.isLogged && 
                                        <button onClick={(e) => {
                                        e.preventDefault();
                                        tokenRefreshClickHandler("/dashboard")
                                        }}>Dashboard</button>
                                }
                               

                            <button onClick={(e) => {
                                e.preventDefault();
                                regularRouteHandler("/")
                                }}>Search Input</button>
                        </div>
                        <div className="col-md-2 d-flex justify-content-end">
                            <button className="thmbut" type="submit" onClick={() => toggleTheme()}>{isDark ? "Light" : "Dark"}</button>
                            {
                                props.isLogged ? <Link to="/logout" onClick={logoutClickHandler}>Logout</Link>
                                    : <Link to="/login">Login</Link>
                            }
                            {
                                !props.isLogged && <Link to="/register">Register</Link>
                            }
                            {
                                props.userType &&
                                    props.userType !== "Company"
                                    && <button onClick={(e) => {
                                        e.preventDefault();
                                        tokenRefreshClickHandler("/cart")
                                        }}>Cart</button>
                            } 
                            {
                                !props.userType &&
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        tokenRefreshClickHandler("/cart")
                                        }}>Cart</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


const LowerNavbar = () => {
    return (
        <div className="lowernav-container">

            <div className="lower-nb ">
                <button to="/">All</button>
                <button to="/">Popular deals</button>
                <button to="/">Customer Service</button>
                <button to="/">Sell</button>
            </div>
        </div>
    )
}

export { Navbar, LowerNavbar };