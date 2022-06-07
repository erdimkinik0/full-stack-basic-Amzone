import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const useFetchData = (url,props) => {
    const [data,setData] = useState();
    let navigate = useNavigate();

    const fetchUserData = async () => {
        try{
            let res = await fetch(url,{
                method:"get",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if(res.status === 200){
                let resJson = await res.json();
                setData(resJson);
            }
            else {
                await fetch("http://localhost:4000/logout",{
                    method:"delete",
                    body:JSON.stringify(props.refreshToken),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("setupTime");
                localStorage.removeItem("userType");
                navigate("/");
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserData()
    },[])

    return [data];
}


export {useFetchData};