import { useProductFormHandler } from "../../../hooks/UseFormOnChangeHandler";
import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";

const ProductCreate = (props) => {
    const [inputData, onChangeHandler] = useProductFormHandler();
    const [fileData,setFileData] = useState(null);
    let navigate = useNavigate();

    const onChangeFileHandler = (e) => {
        setFileData(e.target.files);
    }

    const checkIfAuthorizatedUser = async () => {
        try{
            let res = await fetch("http://localhost:5000/products/list/create",{
                method:"get",
                headers:{
                    "Content-Type":"application/json",
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
            const data = new FormData();
            data.append("name",inputData.name);
            data.append("description",inputData.description);
            data.append("status",inputData.status);
            data.append("price",inputData.price);
            data.append("storage",inputData.storage);
            
            data.append("productImage",fileData[0]);
            let res = await fetch("http://localhost:5000/products/list/create",{
                method:"post",
                body:data,
                headers:{
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if (res.status === 201){
                navigate("/products/list")
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
            {console.log(inputData)}
            {console.log(fileData)}
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
                    <label htmlFor="storage" className="form-label">Storage</label>
                    <input onChange={onChangeHandler} type="number" className="form-control" id="storage" name="storage"  />
                </div>
                <div className="mb-3">
                    <input onChange={onChangeFileHandler} type="file" className="form-control" id="productImage" name="productImage"  />
                </div>
                
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ProductCreate;