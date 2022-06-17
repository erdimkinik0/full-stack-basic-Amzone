import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "../../css/detail.css";
import Slider from "react-slick";

const Detail = () => {

    let navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState(null);
    let itemId = params.id;
    console.log(itemId);
    const [quantity, setQuantity] = useState(0);

    const improveQuantity = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    }
    const decreaseQuantity = (e) => {
        e.preventDefault();
        setQuantity(quantity - 1);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    const fetchProduct = async () => {
        try {
            let res = await fetch(`http://localhost:5000/products/${itemId}`);
            if (res.status === 200) {
                let resJson = await res.json();
                setData(resJson);
                console.log(resJson)
            } else {
                navigate("/");
            }

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchProduct();

        return () => { fetchProduct() };
    }, [])


    return (
        <div className="container-fluid detail-gen-container">
            {
                data &&
                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 left-side">
                        <Slider {...settings}>
                            <div className="det-image-container">
                                <img src={`http://localhost:5000/${data.img}`} alt="" />
                            </div>
                            <div className="det-image-container">
                                <img src={`http://localhost:5000/${data.img}`} alt="" />
                            </div>

                        </Slider>
                    </div>
                    <div className="col-md-4 right-side">
                        <div className="prod-name">
                            {data.name} ashdba shdasg agsdva ihdas gajks dadb adshb ahsdhbas jsgvasd gas gha sdhgasd asghasd hg
                        </div>
                        <div className="old-price">
                            Old Price: $xxx
                        </div>
                        <div className="new-price">
                            New Price: ${data.price}
                        </div>
                        <div className="status">
                            Condition: {data.status}
                        </div>
                        <div className="description">
                            <h3>About this item</h3>
                            <p>{data.description}</p>
                        </div>
                        <div className="add-section">

                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="add-cart-container">
                            <div><strong>Buy: </strong>{data.price}</div>
                            <div><strong>Status: </strong>{data.status}</div>
                            <div className="comp-idnt">Sold by: (Company name)</div>
                            <form>
                                <span className="quan">
                                    <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" defaultValue={0} value={quantity} min={0} />
                                    <button onClick={improveQuantity}>+</button>
                                </span>
                                <button type="submit" className="det-but">Add to Cart</button>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default Detail;