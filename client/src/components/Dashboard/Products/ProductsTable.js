import { Link } from "react-router-dom";

const ProductsTable = (props) => {


    return (
        <div className="container table-container">
            {console.log(props.data)}
            <div class="d-flex flex-row-reverse container">
                <Link className="create-link-l btn" to="/products/list/create">New Product <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </Link>
            </div>
        <table className="table table-striped table-content-container">
            <thead>
                <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Sold Count</th>
                    <th scope="col">Storage</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data && 
                        props.data.map((product) => {
                                return <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.sold_count}</td>
                                            <td>{product.storage}</td>
                                            <td>{product.status}</td>
                                        </tr>
                            })
                }
                
            </tbody>
        </table>


    </div>
    )

}

export default ProductsTable;