import { useNavigate } from "react-router-dom";
import { useAdvertFormHandler } from "../../../hooks/UseFormOnChangeHandler";

const AdvertCreate = (props) => {
    const [inputData,onChangeHandler] = useAdvertFormHandler();
    let navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();

            let res = await fetch("http://localhost:5000/adverts/create",{
                method:"post",
                body:JSON.stringify(inputData),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if(res.status === 201){
                navigate("/adverts")
            }
            else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("setupTime");
                window.location.reload();
                props.setIsLogged(false);
                navigate("/login")
            }

        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AdvertCreate;