import { useFetchData } from "../../../hooks/UseFetchData";
import "../../../css/tables.css"
import { useState } from "react";

// components
import ProductsTable from "./ProductsTable";

const Products = (props) => {
    const [data,setData] = useFetchData("http://localhost:5000/products/list", props);
    const [currentPage , setcurrentPage] = useState(1);
    const [productsPerPage] = useState(15);
    let currentProducts;
    let lastIndexofPage = currentPage * productsPerPage;
    let firstndexofPage = lastIndexofPage - productsPerPage;

    let pages = [];

    if(data) {
        for(let i = 1 ; i <= Math.ceil(data.length / productsPerPage); i++ ){
            pages.push(i);
        }
    }
    if(data){
        currentProducts = data.slice(firstndexofPage,lastIndexofPage);
    }
    
    const paginationClicked = (n) => {
        setcurrentPage(n);
    } 

    return (
        <div>
            <div className="container product-body">
                <ProductsTable data={data} setData={setData} accessToken={props.accessToken} currentProducts={currentProducts}/>
                <ul className="pagination">
                    {
                        pages && 
                            pages.map((number) => {
                                return <li key={number} className="page-item">
                                    <div className="page-link" onClick={() => paginationClicked(number)}>{number}</div>
                                </li>
                            })
                            
                    }
                </ul>
            </div>
        </div>
    )
}


export default Products;