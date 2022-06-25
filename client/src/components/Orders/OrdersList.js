import { useFetchData } from "../../hooks/UseFetchData";
import "../../css/tables.css"
import { useState } from "react";
const OrdersList = (props) => {
    const [data] = useFetchData("http://localhost:5000/orders/list", props);
    const [currentPage , setcurrentPage] = useState(1);
    const [ordersPerPage] = useState(15);
    let currentOrders;
    let lastIndexofPage = currentPage * ordersPerPage;
    let firstndexofPage = lastIndexofPage - ordersPerPage;

    let pages = [];

    if(data) {
        for(let i = 1 ; i <= Math.ceil(data.length / ordersPerPage); i++ ){
            pages.push(i);
        }
    }
    if(data){
        currentOrders = data.slice(firstndexofPage,lastIndexofPage);
    }
    
    const paginationClicked = (n) => {
        setcurrentPage(n);
    } 


    return (
        <div className="container table-container">
            {console.log(data)}
            <table className="table table-striped table-content-container">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentOrders && 
                            currentOrders.map((order,index) => {
                                    return <tr key={index}>
                                                <td>{order.product_id}</td>
                                                <td>{order.product_name}</td>
                                                <td>{order.quan}</td>
                                                <td>{order.product_price}</td>
                                                <td>{order.total}</td>
                                            </tr>
                                })
                    }
                    
                </tbody>
            </table>
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
    )
}


export default OrdersList