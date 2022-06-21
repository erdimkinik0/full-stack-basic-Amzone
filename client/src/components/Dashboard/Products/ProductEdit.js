import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/create-form.css"
import { useFetchData } from "../../../hooks/UseFetchData";



const ProductEdit = (props) => {
    let params = useParams();
    let itemId = params.id;
    let navigate = useNavigate();
 
    const [data] = useFetchData(`http://localhost:5000/products/${itemId}/edit`,props);

   
       
    const [inputData,setInputData] = useState({
        name:"",
        description:"",
        status:"",
        price:null,
        storage:null
    });

    const onChangeHandler = (e) => {
        setInputData({
            ...inputData,[e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        setInputData(data)
    },[data])

    

    const onEditSubmitHandler = async () => {
        try{
            let res = await fetch(`http://localhost:5000/products/${itemId}/edit`,{
                method:"post",
                body:JSON.stringify(inputData),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if (res.status === 202){
                navigate("/products/list")
            }
            

        }catch(err){
            console.log(err);
        }

    }

    return (
        <div className="container create-table-container">
            {
                data &&  <div className="row justify-content-center">
                     {console.log("InputDAta")}
                     {console.log(inputData)}
                <div className="col-md-6 create-table-content-container">
                    <h3 className="form-tit">
                        Edit Your Product
                    </h3>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onEditSubmitHandler()
                    }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input onChange={onChangeHandler} type="text" className="form-control" id="name" name="name" defaultValue={data.name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea onChange={onChangeHandler} className="form-control" id="description" name="description" rows="3" defaultValue={data.description}></textarea>
                        </div>
                        <div className="mb-3">

                            <label htmlFor="status" className="form-label">Status</label>
                            <input onChange={onChangeHandler} type="text" className="form-control" id="status" name="status" defaultValue={data.status} />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input onChange={onChangeHandler} type="number" className="form-control" id="price" name="price" defaultValue={data.price}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="storage" className="form-label">Storage</label>
                                    <input onChange={onChangeHandler} type="number" className="form-control" id="storage" name="storage" defaultValue={data.storage}/>
                                </div>
                            </div>
                        </div>

                        <div className="submit-div">
                            <button type="submit" className="btn create-link">Submit</button>
                        </div>

                    </form>
                </div>

            </div>
            }
        </div>
    )
}

export default ProductEdit;