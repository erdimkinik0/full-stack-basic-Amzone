import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/UseFetchData";

const Products = (props) => {
    const [data] = useFetchData("http://localhost:5000/products/list",props);

    return (
        <div>
            {/* {console.log(data[15])} */}
            {console.log(data)};
            Products of logged user

            <br /> 
            here, products of company will be rendered
            <Link to="/products/list/create">New Product</Link>

            <div>
                {data && data.map((item) => {
                    return (<img src={`http://localhost:5000/${item.img}`} alt="dummy" />)
                })}
            </div>


            <div>
               
            </div>
        </div>
    )
}


export default Products;