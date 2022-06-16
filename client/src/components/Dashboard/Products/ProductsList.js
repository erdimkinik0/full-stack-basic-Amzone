import { useFetchData } from "../../../hooks/UseFetchData";
import "../../../css/tables.css"

// components
import ProductsTable from "./ProductsTable";

const Products = (props) => {
    const [data] = useFetchData("http://localhost:5000/products/list", props);

    return (
        <div>
            <div className="container product-body">
                <ProductsTable data={data}/>
            </div>
        </div>
    )
}


export default Products;