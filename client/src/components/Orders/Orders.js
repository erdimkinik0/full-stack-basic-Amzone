import { useFetchData } from "../../hooks/UseFetchData";

const Orders = (props) => {
    const [data] = useFetchData("http://localhost:5000/orders",props);


    return (
        <div className="container">
            
            
        </div>
    )
}


export default Orders