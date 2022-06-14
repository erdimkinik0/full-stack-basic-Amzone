import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/UseFetchData";

// components
import ProductsTable from "./ProductsTable";

const Products = (props) => {
    const [data] = useFetchData("http://localhost:5000/products/list", props);

    return (
        <div className="container">
            {/* {console.log(data[15])} */}
            {console.log(data)};
            Products of logged user

            <br />
            here, products of company will be rendered
            <Link to="/products/list/create">New Product</Link>

            <div className="container product-body">
                <ProductsTable data={data}/>
            </div>

           

              

        </div>
    )
}


export default Products;