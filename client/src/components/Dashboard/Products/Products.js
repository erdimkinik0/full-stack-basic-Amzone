import { useNormalFetchData } from "../../../hooks/UseNormalFetchData";
import "../../../css/products-ui.css"
import { Link } from "react-router-dom";

const ProductsComp = () => {

    const [data] = useNormalFetchData("http://localhost:5000/products");


    return (
        <div className="container-fluid products-comp-container">
            {console.log(data)}
            <div className="row">
                <div className="col-md-2 left-side">category section</div>
                <div className="col-md-10 right-side">
                    <div className="row">
                        
                        {
                            data &&
                                data.map((product,index) => {
                                    return <div className="col-md-3 product-general-container" key={index}>
                                        <div className="card-container">
                                            <img className="product-image" src={`http://localhost:5000/${product.img}`} alt="product-img" />
                                            <div className="card-body-container">
                                                <Link to={`${product._id}/detail`}><p className="product-name">{product.name}asdasdasasddasasd asd asd asdasd ad aass</p></Link>
                                                <p className="product-price">${product.price} <span className="product-comment">reviews:{product.comments.length}</span></p>
                                                <p className="body-text">{product.description.slice(0,100)}...</p>
                                                <Link style={{position:"absolute",bottom:"10px"}} to={`${product.id}/detail`}>See more</Link>
                                            </div>
                                        </div>
                                    </div>
                                })
                        }
                    </div> 
                </div>
            </div>

        </div>
    )
}

export default ProductsComp;
