import "../../../css/adverts.css";
import { useNormalFetchData } from "../../../hooks/UseNormalFetchData";
import { Link } from "react-router-dom"
import { useState } from "react";

const Adverts = () => {

    const [data] = useNormalFetchData("http://localhost:5000/adverts");
    const[currentPage,setCurrentPage] = useState(1);
    const [advertsPerPage] = useState(5);

    let lastIndexofPage = currentPage * advertsPerPage;
    let firstIndexofPage = lastIndexofPage - advertsPerPage;

    let currentAdverts;
    let pageNumbers  = [];

    if(data) {
        for(let i = 1 ; i <= Math.ceil(data.length / advertsPerPage); i++){
            pageNumbers.push(i)
        }
    }

    if(data){
        currentAdverts = data.slice(firstIndexofPage,lastIndexofPage);
    }

    const onPaginationHandler = (numb) => {
        setCurrentPage(numb);
    }



    return (
        <div className="container adverts-gen-container">
            {console.log(data)}
            <h3>All Adverts</h3>
            <p className="sub-title">See what they want and contact with them</p>
            {
                currentAdverts &&
                    currentAdverts.map((advert) => {
                            return <div className="advert-container" key={advert._id}>
                                <div className="row d-flex justify-content-bwetwwen">
                                    <div className="advert-username col-md-12"><Link to="/">{advert.username}</Link></div>
                                    <div className="advert-title col-md-12">Title: {advert.title}</div>
                                    <div className="advert-category col-md-12"><span>Category:</span> {advert.category}</div>
                                    <div className="advert-content col-md-12">{advert.content}</div>
                                    <div className="advert-date col-md-12 d-flex justify-content-end">Date: {advert.created_date.slice(0,10)}</div>
                                </div>
                            </div>
                })

            }
            
                <ul className="pagination">
                    {
                       pageNumbers.map((number) => {
                        return <li key={number} className="page-item">
                            <div onClick={() => onPaginationHandler(number)} className="page-link div-page" to={"#"} >{number}</div>
                        </li>
                       })
                    
                    }
                </ul>
      
            

        </div>
    )
}


export default Adverts;