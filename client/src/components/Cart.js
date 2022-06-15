import { useNavigate } from "react-router-dom";
import "../css/cart.css";
import { useFetchData } from "../hooks/UseFetchData";
import { useOrderFormHandler } from "../hooks/UseFormOnChangeHandler";



const Cart = (props) => {
    const [data] = useFetchData("http://localhost:5000/cart", props);
    const [inputData,onChangeHandler] = useOrderFormHandler()
    let navigate = useNavigate()

    const orderSubmitHandler = async (e) => {
        try{
            e.preventDefault();

            let res = await fetch("http://localhost:5000/orders/create",{
                method:"post",
                body:JSON.stringify(inputData),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if (res.status === 201){
                console.log("new Order has been created")
                navigate("/")
            }
        }catch(err){
            console.log(err)
        }
       

    }
    

    return (
        <div className="container order-section-container">
            <div className="row">
                <div className="col-md-8">
                    <div className="cart-table-container">
                        {console.log(data)}
                        <div className="cart-table-header">
                            <div className="row">
                                <div className="col-md-2 tab-h">
                                    Img
                                </div>
                                <div className="col-md-4 tab-h">
                                    Name
                                </div>

                                <div className="col-md-2 tab-h">
                                    Price
                                </div>

                                <div className="col-md-1 tab-h">
                                    Quantity
                                </div>

                                <div className="col-md-2 tab-h">
                                    Total
                                </div>
                                <div className="col-md-1 tab-h">

                                </div>
                            </div>
                        </div>
                        <div className="cart-table-content">
                            {/* cart data from server */}
                            {
                                data &&
                                data.map((item, index) => {
                                    return <div key={index} className="row">
                                        <div className="col-md-2 content-img">
                                            <img src={`http://localhost:5000/${item.product.img}`} alt="item-img" />
                                        </div>
                                        <div className="col-md-4 content">
                                            {item.product.name.slice(0, 20)}
                                        </div>

                                        <div className="col-md-2 content">
                                            {item.product.price}
                                        </div>

                                        <div className="col-md-1 content">
                                            {item.quantity}
                                        </div>

                                        <div className="col-md-2 content">
                                            {item.product.price * item.quantity}
                                        </div>
                                        <div className="col-md-1 content">
                                            delete
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="order-form-container">
                        <h3>Complete your order</h3>
                        <form onSubmit={orderSubmitHandler}>
                            <input onChange={onChangeHandler} className="form-control" type="text" placeholder="Country" name="to_country" id="to_country" />
                            <input onChange={onChangeHandler} className="form-control" type="text" placeholder="City" name="to_city" id="to_city" />
                            <input onChange={onChangeHandler} className="form-control" type="text" placeholder="Street" name="to_street" id="to_street" />
                            <button type="submit" className="order-submit btn">Submit</button>   
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default Cart;
