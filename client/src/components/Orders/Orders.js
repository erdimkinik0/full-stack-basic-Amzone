import { useFetchData } from "../../hooks/UseFetchData";
import "../../css/tables.css"
const Orders = (props) => {
    const [data] = useFetchData("http://localhost:5000/orders", props);
    return (
        <div className="container table-container">
            {console.log(data)}
            <table className="table table-striped table-content-container">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                        data.map((order, index) => {
                            return <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total}</td>
                            </tr>
                        })
                    }

                </tbody>
            </table>


        </div>
    )
}


export default Orders