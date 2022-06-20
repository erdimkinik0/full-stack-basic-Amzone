import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/UseFetchData";
import "../../../css/tables.css"


const AdvertsList = (props) => {
    const [data,setData] = useFetchData("http://localhost:5000/adverts/list", props);

    

    const onRemoveHandler = async (advertId) => {
        try{    
            let advertid = {
                advert_id:advertId
            }
            let res = await fetch("http://localhost:5000/adverts/delete",{
                method:"delete",
                body:JSON.stringify(advertid),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if(res.status === 200){
                console.log("advert ahs been deleted");
                let newAdvArr = data.filter((advert) => {
                    return advert._id !== advertId
                })
                setData(newAdvArr);
            }

        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <div className="container table-container">
                <div class="d-flex flex-row-reverse container">
                    <Link className="create-link-l btn" to="/adverts/list/create">New Advert <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    </Link>
                </div>
                <table className="table table-striped table-content-container">
                    <thead>
                        <tr>
                            <th scope="col">Created Time</th>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            data &&
                                data.map((advert) => {
                                    return <tr key={advert._id}>
                                        <td>{advert.created_date}</td>
                                        <td>{advert._id}</td>
                                        <td>{advert.title}</td>
                                        <td>{advert.content.slice(0, 19)}</td>
                                        <td><button className="btn btn-danger" onClick={(e) => {
                                            e.preventDefault();
                                            onRemoveHandler(advert._id);
                                        }}>
                                            Delete
                                            </button></td>
                                    </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default AdvertsList;