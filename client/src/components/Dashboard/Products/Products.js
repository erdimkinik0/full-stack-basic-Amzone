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
    const [categories] = useNormalFetchData("http://localhost:5000/products/categories");

    
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
    },[category])



    
    const [currentPage,setCurrenPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);


    let lastIndexOfPage = currentPage * itemsPerPage;
    let firstIndexOfPage = lastIndexOfPage - itemsPerPage;

    let pageNumbers = [];

    if(data){
        for(let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++){
            pageNumbers.push(i)
        }
    }

    let currentItems;
    if(data) {
        currentItems = data.slice(firstIndexOfPage,lastIndexOfPage);
    }


    const paginateClickHandle = (numb) => {
        setCurrenPage(numb)
    }


    let catPageNumbers = [];
    if(filteredData){
        for(let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
            catPageNumbers.push(i);
        }
    }
    let sortedCatItems;

    if(filteredData) {
        sortedCatItems = filteredData.slice(firstIndexOfPage,lastIndexOfPage);
    }

    

    


    return (
        <div className="container-fluid products-comp-container">
            <div className="row">
                <div className="col-md-2 left-side">
                    {
                        categories &&
                            categories.sort().map((category,index) => {
                                return <div key={index}>
                                    <Link to={`/products/filter?category=${category}`}>{category}</Link>
                                </div>
                            })
                    }
                </div>
                <div className="col-md-10 right-side">
                    <div className="row">
                        
                        { !category &&
                                currentItems &&
                                    currentItems.map((product,index) => {
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
                        {
                            !category &&
                                currentItems &&
                                <ul className="pagination">
                                   { 
                                        pageNumbers.map((number,index) => {
                                            return <li key={index} className="page-item">
                                                <div to="#" className="page-link" onClick={() => {
                                                    paginateClickHandle(number)
                                                }}>{number}</div>
                                            </li>
                                        })
                                   }

                                </ul>
                        }
                        { category &&
                                sortedCatItems &&
                                    sortedCatItems.map((product,index) => {
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
                        {
                            category &&
                                sortedCatItems &&
                                    <ul className="pagination">
                                        {
                                            catPageNumbers.map((number,index) => {
                                                return <li key={index} className="page-item">
                                                    <div onClick={() => {
                                                        paginateClickHandle(number)
                                                    }} className="page-link">{number}</div>
                                                </li>
                                            })
                                        }

                                    </ul>
                        }

                        
                    </div> 
                </div>
            </div>

        </div>
    )
}

export default ProductsComp;
