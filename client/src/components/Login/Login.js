import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("");
    let navigate = useNavigate();

    const onChangeHandler = (e) => {
        setInputData({
            ...inputData, [e.target.name]: e.target.value
        })
    }

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
            let resJson;
            if (res.status === 200) {
                resJson = await res.json();
                console.log(resJson);
                localStorage.setItem("user",resJson);
                props.setIsLogged(true);
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

        if(localStorage.getItem("user")){
            navigate("/")
        }
    })

    return (
        <div className="login-container">
            <form onSubmit={formOnSubmitHandler}>
                <div className="err-message">
                    {message}
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
    )
}

export default Login;