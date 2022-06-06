import { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router-dom";


const Adverts = () => {
    const [userData, setUserData] = useState(null);
    let navigate = useNavigate()
    async function fetchUserData() {
        try{
            let res = await fetch("http://localhost:5000/adverts",{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if(res.status === 200){
                let resJson = await res.json();
                setUserData(resJson);
            }
            else {
                navigate("/login")
            }
        }catch(err){    
            console.log(err)
        }
        
    }
    useEffect(() => {
        fetchUserData()
    })


    return (
        <div>
            Adverts
           {
               userData && 
                    <div> {userData.username} </div>
           }
           <Link to="/adverts/create">Create Advert</Link>
        </div>
    )
}


export default Adverts;