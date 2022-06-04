import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from "../hooks/GlobalContext"

const Navbar = (props) => {
    const [{ isDark }, toggleTheme] = useContext(ThemeContext);
    let navigate = useNavigate();
    const submitted = async (e) => {
        try {
            e.preventDefault();
            let res = await fetch("http://localhost:4000/token", {
                method: "post",
                body: JSON.stringify(props.refreshToken),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (res.status === 200) {
                let newTokenJson = await res.json();

                localStorage.setItem("accessToken", newTokenJson.accessToken)
            }
            else {
                let errMessage = await res.json();
                console.log(errMessage)
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
            localStorage.setItem("accessToken","");
            localStorage.setItem("refreshToken","");
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="nav-container">
            <div className="container-fluid">
                <div className="top-nb">
                    <div className="row d-flex mt-1">
                        <div className="col-md-1">
                            <Link onClick={submitted} to="/">Logo</Link>
                        </div>
                        <div className="col-md-9">
                            <Link to="/">Dropdown Menu</Link>
                            <Link to="/">Search Input</Link>
                        </div>
                        <div className="col-md-2 d-flex justify-content-end">
                            <button className="thmbut" type="submit" onClick={() => toggleTheme()}>{isDark ? "Light" : "Dark"}</button>
                            {
                                props.isLogged ? <Link to="/logout" onClick={logoutClickHandler}>Logout</Link>
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