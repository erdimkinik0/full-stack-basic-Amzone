import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// dashboard components


const Dashboard = (props) => {
    const [resp, setResp] = useState(null);
    let navigate = useNavigate()
    async function getAuthorizatedCurrentUser() {
        let res = await fetch("http://localhost:4000/authorizated-user", {
            headers: {
                "Authorization": `Bearer ${props.accessToken.token}`
            }
        })

        if (res.status === 200) {
            let resJson = await res.json();
            setResp(resJson);
        }
        else {
            navigate("/login")
        }

    }
    useEffect(() => {
        getAuthorizatedCurrentUser()
    }, [])

    const regularOnClickHandler = (url) => {
        navigate(url);
    }
    return (
        <div className="container products-main">
            {props.accessToken && console.log(props.accessToken)}
            {
                resp &&
                resp.onType === "Company" &&
                <div className="prod-main-content-container">
                    <h2 className="main-title">Welcome !  {resp.username}</h2>
                    <p>Manage your account</p>
                    <div className="row justify-content-around">

                        <div onClick={(e) => regularOnClickHandler("/products/list")} className="col-md-4 choose-process">
                            <div className="prod">
                                <h3>Products</h3>
                                <div className="pro-choose-content">

                                </div>
                            </div>
                            <p>Add & Edit your products</p>
                        </div>
                        <div onClick={(e) => regularOnClickHandler("/orders/list")} className="col-md-4 choose-process ">
                            <div className="ord">
                                <h3>Orders</h3>
                                <div className="pro-choose-content">

                                </div>
                            </div>
                            <p>Check your current and previous orders</p>
                        </div>
                    </div>
                </div>
            }
            {
                resp &&
                resp.onType === "Customer" &&
                <div className="prod-main-content-container">
                    <h2 className="main-title">Welcome !  {resp.username}</h2>
                    <p>Manage your account</p>
                    <div className="row justify-content-around">

                        <div onClick={(e) => regularOnClickHandler("/adverts/list")} className="col-md-4 choose-process">
                            <div className="adv">
                                <h3>Adverts</h3>
                                <div className="pro-choose-content">

                                </div>
                            </div>
                            <p>Add & Edit your adverts</p>
                        </div>
                        <div onClick={(e) => regularOnClickHandler("/orders")} className="col-md-4 choose-process ">
                            <div className="ord-c">
                                <h3>Order History</h3>
                                <div className="pro-choose-content">

                                </div>
                            </div>
                            <p>Check your previous orders</p>
                        </div>
                    </div>
                </div>
            }
            {
                resp &&
                resp.message &&
                <div>
                    <h3>{resp.message} </h3>

                </div>
            }
        </div>
    )
}


export default Dashboard;