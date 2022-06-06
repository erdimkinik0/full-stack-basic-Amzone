import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterCustomerFormHandler } from "../../hooks/UseFormOnChangeHandler";


const CustomerRegister = () => {
    const [inputData, onChangeHandler] = useRegisterCustomerFormHandler();
    const [errMessage, setErrMessage] = useState("");
    let navigate = useNavigate();

    const registerSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            let res = await fetch("http://localhost:4000/register/customer", {
                method: "post",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.status === 201) {
                navigate("/login");
            }
            else {
                let resJson = await res.json();
                setErrMessage(resJson.message);
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log(inputData);
    console.log(errMessage);
    useEffect(() => {
        const errorDOM = document.querySelector(".error");
        errorDOM.textContent = errMessage;
        let errorTimer = setTimeout(() => {
            setErrMessage("");
        },3000)
        return () => {
            clearTimeout(errorTimer);
        }
    },[errMessage])
    return (
        <div>
            <form onSubmit={registerSubmitHandler}>
                <div className="error">
                    
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input onChange={onChangeHandler} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="username" className="form-label">Username</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="username" name="username" />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input onChange={onChangeHandler} type="password" className="form-control" id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label for="firstname" className="form-label">Firstname</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="firstname" name="firstname" />
                </div>
                <div className="mb-3">
                    <label for="lastname" className="form-label">Lastname</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="lastname" name="lastname" />
                </div>
                <div className="mb-3">
                    <label for="country" className="form-label">Country</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="country" name="country" />
                </div>
                <div className="mb-3">
                    <label for="city" className="form-label">City</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="city" name="city" />
                </div>
                <div className="mb-3">
                    <label for="street" className="form-label">Street</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="street" name="street" />
                </div>
                <div className="mb-3">
                    <label for="zip" className="form-label">Zip</label>
                    <input onChange={onChangeHandler} type="number" className="form-control" id="zip" name="zip" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}



export default CustomerRegister;