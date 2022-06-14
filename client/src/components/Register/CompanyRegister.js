import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../hooks/GlobalContext";
import { useRegisterCompanyFormHandler } from "../../hooks/UseFormOnChangeHandler";


const CompanyRegister = () => {
    const [inputData, onChangeHandler] = useRegisterCompanyFormHandler();
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const [{theme}] = useContext(ThemeContext);

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
        }, 3000)

        return () => {
            clearTimeout(messageTImer)
        }
    }, [message])
    return (
        <div className="container-fluid">
            <div className="row justify-content-between ">
                <div className="col-md-4">
                    <div className="form-container" style={{ boxShadow: theme.boxShadow }}>
                        <form onSubmit={registerSubmitHandler}>
                            <div className="error">
                            </div>
                            <div className="form-title">
                                <h4>Sign up</h4>
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="email" placeholder="Email address" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" placeholder="Username" className="form-control" id="username" name="username" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="password" placeholder="Password" className="form-control" id="password" name="password" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" placeholder="Company Name" className="form-control" id="company_name" name="company_name" />
                            </div>

                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" placeholder="Country" className="form-control" id="country" name="country" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" placeholder="City" className="form-control" id="city" name="city" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="text" placeholder="Street" className="form-control" id="street" name="street" />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChangeHandler} type="number" placeholder="Zip" className="form-control" id="zip" name="zip" />
                            </div>
                            <button type="submit" className="btn btn-primary form-but">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-7 cust-reg-right-side">
                    <div className="cust-reg-right-side-box">
                        <div>
                            <h4>Company Signing up</h4>
                            <p>- Set up your items on market </p>
                            <p>- Follow trends of market and manage your items </p>
                            <p>- keep in touch with customers, ensure good customer service and earn your place among the best sellers</p>
                            <p>- Sell your item within secure</p>
                            <p>- Achieve your goals</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyRegister;