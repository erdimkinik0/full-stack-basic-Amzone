import { useNormalFetchData } from "../../../hooks/UseNormalFetchData";
import "../../../css/products-ui.css"
import { Link } from "react-router-dom";

import {useSearchParams} from "react-router-dom"
import { useEffect, useState } from "react";

const ProductsComp = () => {

    const [data] = useNormalFetchData("http://localhost:5000/products");
    const [searchParams,setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
    const [filteredData,setFilteredData] = useState(null);

    
    const fetchFilteredData = async () => {
        try{
            let res = await fetch(`http://localhost:5000/products/filter?category=${category}`);
            if(res.status === 200){
                let resJson = await res.json();
                setFilteredData(resJson);
            }

        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        fetchFilteredData()
    },[])


    return (
        <div className="container-fluid products-comp-container">
            {console.log(data)}
            <div className="row">
                <div className="col-md-2 left-side">category section</div>
                <div className="col-md-10 right-side">
                    <div className="row">
                        
                        { !category &&
                                data &&
                                    data.map((product,index) => {
                                        return <div className="col-md-3 product-general-container" key={index}>
                                            <div className="card-container">
                                                <img className="product-image" src={`http://localhost:5000/${product.img}`} alt="product-img" />
                                                <div className="card-body-container">
                                                    <Link to={`${product._id}/detail`}><p className="product-name">{product.name}asdasdasasddasasd asd asd asdasd ad aass</p></Link>
                                                    <p className="product-price">${product.price} <span className="product-comment">reviews:{product.comments.length}</span></p>
                                                    <p className="body-text">{product.description.slice(0,100)}...</p>
                                                    <Link style={{position:"absolute",bottom:"10px"}} to={`${product.id}/detail`}>See more</Link>
                                                </div>
                                            </div>
                                        </div>
                                    })
                        }
                         { category &&
                                filteredData &&
                                    filteredData.map((product,index) => {
                                        return <div className="col-md-3 product-general-container" key={index}>
                                            <div className="card-container">
                                                <img className="product-image" src={`http://localhost:5000/${product.img}`} alt="product-img" />
                                                <div className="card-body-container">
                                                    <Link to={`/products/${product._id}/detail`}><p className="product-name">{product.name}asdasdasasddasasd asd asd asdasd ad aass</p></Link>
                                                    <p className="product-price">${product.price} <span className="product-comment">reviews:{product.comments.length}</span></p>
                                                    <p className="body-text">{product.description.slice(0,100)}...</p>
                                                    <Link style={{position:"absolute",bottom:"10px"}} to={`/products/${product._id}/detail`}>See more</Link>
                                                </div>
                                            </div>
                                        </div>
                                    })
                        }

                        
                    </div> 
                </div>
            </div>

        </div>
    )
}

export default ProductsComp;
