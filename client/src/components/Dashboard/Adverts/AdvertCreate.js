import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdvertFormHandler } from "../../../hooks/UseFormOnChangeHandler";
import "../../../css/create-form.css"

const AdvertCreate = (props) => {
    const [inputData,onChangeHandler] = useAdvertFormHandler();
    let navigate = useNavigate();

    async function checkIfAuthorization(){
        try{
            let res = await fetch("http://localhost:5000/adverts/list/create",{
                method:"get",
                headers:{
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if(res.status === 200){
                console.log("authed")
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
            console.log(err)
        }
    }

    useEffect(() => {
       checkIfAuthorization();
    })

    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();

            let res = await fetch("http://localhost:5000/adverts/list/create",{
                method:"post",
                body:JSON.stringify(inputData),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if(res.status === 201){
                navigate("/adverts/list")
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
    return (
        <div className="container create-table-container">
            <div className="row justify-content-center">
                <div className="col-md-6 create-table-content-container">
                    <h3 className="form-tit">
                        Create a new Advert
                    </h3>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input onChange={onChangeHandler} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input onChange={onChangeHandler} type="text" className="form-control" id="category" name="category" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">What are you looking for?</label>
                            <textarea onChange={onChangeHandler} className="form-control" id="content" name="content" rows="3"></textarea>
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

export default AdvertCreate;