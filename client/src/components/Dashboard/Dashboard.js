import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// dashboard components


const Dashboard = (props) => {
    const [resp,setResp] = useState(null);
    let navigate = useNavigate()
    async function getAuthorizatedCurrentUser() {
        let res = await fetch("http://localhost:4000/authorizated-user",{
            headers:{
                "Authorization":`Bearer ${props.accessToken.token}`
            }
        })
        
        if (res.status === 200){
            let resJson = await res.json();
            setResp(resJson);
        }
        else {
            navigate("/login")
        }
        
    }
    useEffect(() => {
        getAuthorizatedCurrentUser()
    },[])
    return (
        <div>
            {props.accessToken && console.log(props.accessToken)}
            {
                resp && 
                    resp.onType === "Company" &&
                        <div>
                            <h3>{resp.onType} </h3>
                            Welcome ! 
                            {resp.username}
                            <br></br>
                            <Link to="/products/list">Products</Link>
                        </div>
            }
            {
                resp && 
                    resp.onType === "Customer" &&
                        <div>
                            <h3>{resp.onType} </h3>
                            Welcome ! 
                            {resp.username}
                            <br></br>
                            <Link to="/adverts/list">Adverts</Link>
                            <Link to="/orders/list">Orders</Link>
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