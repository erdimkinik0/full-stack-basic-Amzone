import { useFetchData } from "../../hooks/UseFetchData";
import "../../css/tables.css"
const OrdersList = (props) => {
    const [data] = useFetchData("http://localhost:5000/orders/list", props);


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
                        data && 
                            data.map((order,index) => {
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


        </div>
    )
}


export default OrdersList