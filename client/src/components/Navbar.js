import { useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../hooks/GlobalContext"

const Navbar = (props) => {
    const [{isDark},toggleTheme] = useContext(ThemeContext);
    

    return (
        <div className="nav-container">
            <div className="container-fluid">
                <div className="top-nb">
                    <div className="row d-flex mt-1">
                        <div className="col-md-1">
                            <Link to="/">Logo</Link>
                        </div>
                        <div className="col-md-9">
                            <Link to="/">Dropdown Menu</Link>
                            <Link to="/">Search Input</Link>
                        </div>
                        <div className="col-md-2 d-flex justify-content-end">
                            <button className="thmbut" type="sbumit" onClick={() => toggleTheme()}>{isDark ? "Light" : "Dark"}</button>
                            {
                                props.isLogged ? <Link to="/logout">Logout</Link>
                                : <Link to="/login">Login</Link>
                            }
                            <Link to="/">Cart</Link>
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
                <Link to="/">All</Link>
                <Link to="/">Popular deals</Link>
                <Link to="/">Customer Service</Link>
                <Link to="/">Sell</Link>
            </div>
        </div>
    )
}

export { Navbar, LowerNavbar };