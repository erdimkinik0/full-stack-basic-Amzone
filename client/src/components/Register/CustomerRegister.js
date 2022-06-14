import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../hooks/GlobalContext";
import { useRegisterCustomerFormHandler } from "../../hooks/UseFormOnChangeHandler";


const CustomerRegister = () => {
    const [inputData, onChangeHandler] = useRegisterCustomerFormHandler();
    const [errMessage, setErrMessage] = useState("");
    let navigate = useNavigate();
    const [{theme}] = useContext(ThemeContext);

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
        <div className="container-fluid">
            <div className="row justify-content-between ">
                <div className="col-md-4">
                    <div className="form-container" style={{boxShadow:theme.boxShadow}}>
                        <form onSubmit={registerSubmitHandler}>
                            <div className="error">
                                
                            </div>
                            <div className="form-title">
                                <h4>Sign up</h4>
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="email" className="form-control" id="email" placeholder="Email" name="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" className="form-control" placeholder="Username" id="username" name="username" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="password" className="form-control" placeholder="Password" id="password" name="password" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" className="form-control" placeholder="Firstname" id="firstname" name="firstname" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" className="form-control" placeholder="Lastname" id="lastname" name="lastname" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" className="form-control" placeholder="Country" id="country" name="country" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" className="form-control" placeholder="City" id="city" name="city" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" className="form-control" placeholder="Street" id="street" name="street" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="number" className="form-control" placeholder="Zip" id="zip" name="zip" />
                            </div>
                            <button type="submit" className="btn btn-primary form-but">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-7 cust-reg-right-side">
                    <div className="cust-reg-right-side-box">
                        <div>
                            <h4>Customer Signing up</h4>
                            <p>- Look for what you need and add them into your cart </p>
                            <p>- Follow and don't miss discounts</p>
                            <p>- Communicate and negotiate with sellers</p>
                            <p>- Buy within secure</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default CustomerRegister;