import {  Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/UseFetchData";

const Adverts = (props) => {
    const [data] = useFetchData("http://localhost:5000/adverts",props);
    return (
        <div>
            Adverts
           {
              console.log(data)
           }
           <Link to="/adverts/create">Create Advert</Link>
        </div>
    )
}
export default Adverts;