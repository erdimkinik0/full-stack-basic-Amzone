import { useFetchData } from "../../../hooks/UseFetchData";
import "../../../css/tables.css"

// components
import ProductsTable from "./ProductsTable";

const Products = (props) => {
    const [data,setData] = useFetchData("http://localhost:5000/products/list", props);

    return (
        <div>
            <div className="container product-body">
                <ProductsTable data={data} setData={setData} accessToken={props.accessToken}/>
            </div>
        </div>
    )
}


export default Products;