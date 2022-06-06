import { Link } from "react-router-dom";


const Register = () => {


    return (
        <div>
            <div>
                <Link to="/register/customer">Customer</Link>
                <Link to="/register/company" >Company</Link>
            </div>
        </div>
    )
}



export default Register;