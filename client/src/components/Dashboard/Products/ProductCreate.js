import { useProductFormHandler } from "../../../hooks/UseFormOnChangeHandler";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../css/create-form.css"
import { useNormalFetchData } from "../../../hooks/UseNormalFetchData"

const ProductCreate = (props) => {
    const [inputData, onChangeHandler] = useProductFormHandler();
    const [fileData, setFileData] = useState(null);
    let navigate = useNavigate();
  
    const [categSelect,setCategSelect] = useState([])
   

    const onChangeCategSelectHandler = (e) => {
        setCategSelect([
            ...categSelect,e.target.value
        ])
    }

    const onChangeFileHandler = (e) => {
        setFileData(e.target.files);
    }

    const [data] = useNormalFetchData("http://localhost:5000/products/categories");

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
            for (let i = 0 ; i < categSelect.length; i++){
                data.append("category", categSelect[i]);
            }
            

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
    
    const deleteSelected = (selected) => {
       
        let newArr = categSelect.filter((item) => {
            return item !== selected
        })
        setCategSelect(newArr)
        
    } 
    return (
        <div className="container create-table-container">
            {console.log(inputData)}
            {console.log(fileData)}
            {console.log(data)}
            {console.log(categSelect)}
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
                      
                        <div className="row">
                            <div className="col-md-5">
                                <select class="form-select" aria-label="Default select example" onChange={onChangeCategSelectHandler}>
                                    <option selected>Choose Categories</option>
                                    {/*  */}
                                    {
                                        data  &&
                                            data.map((categ) => {
                                                return <option value={categ}>{categ}</option>
                                            })
                                    }
                                </select>
                            </div>
                            <div className="col-md-7">
                                {
                                    categSelect && 
                                        categSelect.map((selected,index) => {
                                            return <div key={index} className="d-flex" style={{float:"right"}}>
                                               <p className="form-cat-p"  onClick={() =>  deleteSelected(selected)}>{selected}</p>
                                            </div>
                                        })
                                }

                            </div>
                        </div>
                        <div className="mb-3">
                           
                            <label htmlFor="status" className="form-label">Status</label>
                            <input onChange={onChangeHandler} type="text" className="form-control" id="status" name="status" placeholder="New,Slightly Used, well-worn"/>
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