import { useNavigate } from "react-router-dom";


const Register = () => {
    let navigate = useNavigate()
    
    const onClickHandler = (url) => {
        navigate(url);
    }


    return (
        <div>
            <div className="container">
                <div className="reg-title">
                    <h4>Who are you?</h4>
                </div>
                
                <div className="row justify-content-center reg-container">
                    <div onClick={(e) => onClickHandler("/register/customer")}  className="col-md-4 reg-card-l">
                        <h2>Customer</h2>
                    </div>
                    <div onClick={(e) => onClickHandler("/register/company")} className="col-md-4 reg-card-r">
                        <h2>Company</h2>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}



export default Register;