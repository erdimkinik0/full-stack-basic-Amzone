import { Link } from "react-router-dom";

const Products = () => {

    // fetch the products from server
    


    return (
        <div>
            Products of logged user

            <br /> 
            here, products of company will be rendered
            <Link to="/products/create">New Product</Link>
        </div>
    )
}


export default Products;