import { useProductFormHandler } from "../../../hooks/UseFormOnChangeHandler";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../css/create-form.css"

const ProductCreate = (props) => {
    const [inputData, onChangeHandler] = useProductFormHandler();
    const [fileData, setFileData] = useState(null);
    let navigate = useNavigate();
    const [onCgData,setOnCgData] = useState({
        category1:"",
        category2:"",
    })
    const onChangeCategoryHandler =(e) => {
        setOnCgData({
            ...onCgData,[e.target.name]:e.target.value
        })
    }

    const onChangeFileHandler = (e) => {
        setFileData(e.target.files);
    }

    const checkIfAuthorizatedUser = async () => {
        try {
            let res = await fetch("http://localhost:5000/products/list/create", {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.accessToken.token}`
                }
            })
            if (res.status === 200) {
                console.log("user is authorizated")
            }
            else {
                await fetch("http://localhost:4000/logout", {
                    method: "delete",
                    body: JSON.stringify(props.refreshToken),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("setupTime");
                localStorage.removeItem("userType")
                props.setIsLogged(false);
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        checkIfAuthorizatedUser();
    })
    const onSubmitHandler = async (e) => {
        try {
          
            e.preventDefault();
            const data = new FormData();
            data.append("name", inputData.name);
            data.append("description", inputData.description);
            data.append("status", inputData.status);
            data.append("price", inputData.price);
            data.append("storage", inputData.storage);
            data.append("category", onCgData.category1);
            data.append("category", onCgData.category2);

            data.append("productImage", fileData[0]);
            let res = await fetch("http://localhost:5000/products/list/create", {
                method: "post",
                body: data,
                headers: {
                    "Authorization": `Bearer ${props.accessToken.token}`
                }
            })
            if (res.status === 201) {
                navigate("/products/list")
            }
            else {
                await fetch("http://localhost:4000/logout", {
                    method: "delete",
                    body: JSON.stringify(props.refreshToken),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                props.setIsLogged(false);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("setupTime");
                localStorage.removeItem("userType")
                navigate("/login")
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="container create-table-container">
            {console.log(inputData)}
            {console.log(fileData)}
            <div className="row justify-content-center">
                <div className="col-md-6 create-table-content-container">
                    <h3 className="form-tit">
                        Create a new Product
                    </h3>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input onChange={onChangeHandler} type="text" className="form-control" id="name" name="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea onChange={onChangeHandler} className="form-control" id="description" name="description" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Category</label>
                            <input onChange={onChangeCategoryHandler} type="text" className="form-control" id="category1" name="category1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Category</label>
                            <input onChange={onChangeCategoryHandler} type="text" className="form-control" id="category2" name="category2" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <input onChange={onChangeHandler} type="text" className="form-control" id="status" name="status" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input onChange={onChangeHandler} type="number" className="form-control" id="price" name="price" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="storage" className="form-label">Storage</label>
                                    <input onChange={onChangeHandler} type="number" className="form-control" id="storage" name="storage" />
                                </div>
                            </div>
                        </div>


                        <div className="mb-3">
                            <input onChange={onChangeFileHandler} type="file" className="form-control" id="productImage" name="productImage" />
                        </div>

                        <div className="submit-div">
                            <button type="submit" className="btn create-link">Submit</button>
                        </div>

                    </form>
                </div>
                
            </div>

        </div>
    )
}

export default ProductCreate;