import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginFormHandler } from "../../hooks/UseFormOnChangeHandler";
const Login = (props) => {
    const [inputData,onChangeHandler] = useLoginFormHandler();
    const [message,setMessage] = useState("");
    let navigate = useNavigate();
    const formOnSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            let res = await fetch("http://localhost:4000/login", {
                method: "post",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            let accessToken;
            let refreshToken;
            if (res.status === 200) {
                let resJson = await res.json();
                console.log(resJson);
                accessToken = resJson.accessToken;
                refreshToken = resJson.refreshToken;
                localStorage.setItem("accessToken",accessToken);
                localStorage.setItem("refreshToken",refreshToken);
                let now = new Date().getTime();
                localStorage.setItem("setupTime",now);

                props.setRefreshToken({
                    token:refreshToken
                })
                props.setAccessToken({
                    token:accessToken
                })
                props.setIsLogged(true)
        
                let resUserData = await fetch("http://localhost:4000/authorizated-user",{
                    method:"get",
                    headers:{
                        "Authorization":`Bearer ${resJson.accessToken}`
                    }
                })
                if(resUserData){
                    let userData = await resUserData.json();
                    props.setUserType(userData.onType)
                    localStorage.setItem("userType",userData.onType)
                }
                navigate("/")
            }
            else {
                let errMessage = await res.json();
                setMessage(errMessage.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
    // showing error
    useEffect(() => {
        const showMessage = document.querySelector(".err-message");
        showMessage.textContent = message;
        const messageInterval = setTimeout(() => {
            setMessage("");
        }, 3000)

        return () => {
            clearTimeout(messageInterval);
        }
    }, [message])

    useEffect(() => {
        if(props.isLogged){
            navigate("/")
        }
    })

    return (
        <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-md-4 form-container-login-left-side">
                        
                    </div>
                    <div className="col-md-4">
                        <form onSubmit={formOnSubmitHandler} className="form-container-login" >
                            <div className="err-message">
                                {message}
                            </div>
                            <div className="form-title-log">
                                <h4>Sign In</h4>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input onChange={onChangeHandler} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input onChange={onChangeHandler} type="password" className="form-control" id="password" name="password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default Login;