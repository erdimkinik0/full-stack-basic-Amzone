import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../hooks/GlobalContext"
import navLogo from "../assets/nav-logo.png"


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
                    token: newTokenJson.accessToken
                })
                localStorage.setItem("setupTime", new Date().getTime())
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
                method: "delete",
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
                    <div className="row d-flex mt-1 ">
                        <div className="col-md-1 d-flex">
                            <img alt="nav-logo" src={navLogo} className="nav-logo" onClick={(e) => {
                                e.preventDefault();
                                regularRouteHandler("/")
                            }} />

                        </div>
                        <div className="col-md-9 d-flex">
                            <button className="thmbut" onClick={(e) => {
                                e.preventDefault();
                                tokenRefreshClickHandler("/")
                            }}>Dropdown</button>

                            {
                                props.isLogged &&
                                <button className="thmbut" onClick={(e) => {
                                    e.preventDefault();
                                    tokenRefreshClickHandler("/dashboard")
                                }}>Dashboard</button>
                            }


                            <form className="seacrh-input">
                                <input className="form-control"></input>
                            </form>
                        </div>
                        <div className="col-md-2 d-flex justify-content-end">
                            <button className="thmbut-mode" type="submit" onClick={() => toggleTheme()}>{isDark 
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                    </svg> 
                                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                                    </svg>}
                            </button>

                            <div className="dropdown">
                                <button className="thmbut nav-acc" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {
                                        !props.isLogged
                                            ? "Account"
                                            : `${props.username}`
                                    }

                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {
                                        !props.isLogged
                                            ? <li><button className="thmbut" onClick={(e) => {
                                                e.preventDefault();
                                                regularRouteHandler("/login")
                                            }}>Login</button></li>
                                            : <li><button className="thmbut" onClick={logoutClickHandler}>Logout</button></li>
                                    }
                                    {
                                        !props.isLogged
                                        && <li><button className="thmbut" onClick={(e) => {
                                            e.preventDefault();
                                            regularRouteHandler("/register")
                                        }}>Register</button></li>

                                    }
                                </ul>
                            </div>
                            {
                                props.userType &&
                                props.userType !== "Company"
                                && <button className="thmbut" onClick={(e) => {
                                    e.preventDefault();
                                    tokenRefreshClickHandler("/cart")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </button>
                            }
                            {
                                !props.userType &&
                                <button className="thmbut" onClick={(e) => {
                                    e.preventDefault();
                                    tokenRefreshClickHandler("/cart")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


const LowerNavbar = (props) => {
    let navigate = useNavigate();
    const regularRouteHandler = (path) => {
        navigate(`${path}`)
    }
    return (
        <div className="lowernav-container">

            <div className="lower-nb ">
                <button to="/">All</button>
                <button to="/">Popular deals</button>
                <button to="/">Customer Service</button>
                {
                    !props.isLogged &&
                        <button 
                            onClick={(e) => {
                            e.preventDefault();
                            regularRouteHandler("/register/company")
                            }}>Sell
                        </button>
                }
            </div>
        </div>
    )
}

export { Navbar, LowerNavbar };