import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterCompanyFormHandler } from "../../hooks/UseFormOnChangeHandler";


const CompanyRegister = () => {
    const [inputData, onChangeHandler] = useRegisterCompanyFormHandler();
    const [message, setMessage] = useState("");
    let navigate = useNavigate();

    const registerSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            let res = await fetch("http://localhost:4000/register/company", {
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
                let errMessage = await res.json();
                setMessage(errMessage.message);
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    useEffect(() => {
        const errorDOM = document.querySelector(".error");
        errorDOM.textContent = message;
        let messageTImer = setTimeout(() => {
            setMessage("");
        },3000)

        return () => {
            clearTimeout(messageTImer)
        }
    },[message])
    return (
        <div>
            <form onSubmit={registerSubmitHandler}>
                <div className="error">
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChangeHandler} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="username" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChangeHandler} type="password" className="form-control" id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="company_name" className="form-label">Company Name</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="company_name" name="company_name" />
                </div>

                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="country" name="country" />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="city" name="city" />
                </div>
                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="street" name="street" />
                </div>
                <div className="mb-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input onChange={onChangeHandler} type="number" className="form-control" id="zip" name="zip" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CompanyRegister;