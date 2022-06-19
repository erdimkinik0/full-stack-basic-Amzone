import "../../../css/adverts.css";
import { useNormalFetchData } from "../../../hooks/UseNormalFetchData";
import { Link } from "react-router-dom"

const Adverts = () => {

    const [data] = useNormalFetchData("http://localhost:5000/adverts");

    return (
        <div className="container adverts-gen-container">
            {console.log(data)}
            <h3>All Adverts</h3>
            <p className="sub-title">See what they want and contact with them</p>
            {
                data &&
                data.map((advert) => {
                    return <div className="advert-container" key={advert._id}>
                        <div className="row d-flex justify-content-bwetwwen">
                            <div className="advert-username col-md-12"><Link to="/">{advert.username}</Link></div>
                            <div className="advert-title col-md-12">{advert.title}</div>
                            <div className="advert-category col-md-12">{advert.category}</div>
                            <div className="advert-content col-md-12">{advert.content}</div>
                            <div className="advert_date col-md-12 d-flex justify-content-end">{advert.created_date.slice(0,10)}</div>
                        </div>
                    </div>
                })

            }


        </div>
    )
}


export default Adverts;