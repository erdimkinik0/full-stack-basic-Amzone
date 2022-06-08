import { useProductFormHandler } from "../../../hooks/UseFormOnChangeHandler";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProductCreate = (props) => {
    const [inputData,onChangeHandler] = useProductFormHandler();
    let navigate = useNavigate();
    const checkIfAuthorizatedUser = async () => {
        try{
            let res = await fetch("http://localhost:5000/products/create",{
                method:"get",
                headers:{
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if(res.status === 200){
                console.log("user is authorizated")
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
                localStorage.removeItem("userType")
                props.setIsLogged(false);
                navigate("/login")
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        checkIfAuthorizatedUser();
    })
    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            let res = await fetch("http://localhost:5000/products/create",{
                method:"post",
                body:JSON.stringify(inputData),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if (res.status === 201){
                navigate("/products")
            }
            else {
                await fetch("http://localhost:4000/logout",{
                    method:"delete",
                    body:JSON.stringify(props.refreshToken),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                props.setIsLogged(false);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("setupTime");
                localStorage.removeItem("userType")
                navigate("/login")
            }
        }catch(err){
            console.log(err);
        }
    } 
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea onChange={onChangeHandler} className="form-control" id="description" name="description" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input onChange={onChangeHandler} type="text" className="form-control" id="status" name="status"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input onChange={onChangeHandler} type="number" className="form-control" id="price" name="price"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input onChange={onChangeHandler} type="number" className="form-control" id="quantity" name="quantity"  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ProductCreate;