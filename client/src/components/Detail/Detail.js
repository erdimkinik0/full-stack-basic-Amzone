import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "../../css/detail.css";
import Slider from "react-slick";

const Detail = (props) => {

    let navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState(null);
    let itemId = params.id;

    const [commentInput,setCommentInput] = useState({
        comment:""
    });

    const commentInputHnadler = (e) => {
        setCommentInput({
            comment:e.target.value
        });
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
    }, []);


    const onCommentSubmitHandler = async (productId) => {
        try{
            let res = await fetch(`http://localhost:5000/products/${productId}/comment`,{
                method:"post",
                body:JSON.stringify(commentInput),  
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${props.accessToken.token}`
                }
            })
            if(res.status === 201){
                console.log("Comment has been added");
            }


        }catch(err){
            console.log(err);
        }
    }


    return (
        <div className="container-fluid detail-gen-container">
            {data && 
                console.log(data)}
            { console.log(commentInput)}
            {
                
                data && 
                
                    <div>
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
                                <div className="new-price">
                                    Price: ${data.price}
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
                                    <div><strong>Left: </strong>{data.storage}</div>
                                    <div className="comp-idnt">Sold by: {data.company_name}</div>
                                    <form onSubmit={(e) => {
                                            e.preventDefault();
                                            props.addItemtoCart(data._id)
                                        }
                                    }>
                                        <span className="quan">
                                            
                                             <input onChange={props.onQuantityChangeHandler} type="number" defaultValue={0} min={0} />
                                        
                                        </span>
                                        <button type="submit" className="det-but">Add to Cart</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="row comment-section">
                            {
                                data.comments.map((comment,index) => {
                                    return <div className="col-md-10 comments" key={index}>
                                    <div className="username">
                                        -{comment.username}
                                    </div>
                                    <div className="date">
                                        Date: {comment.date.slice(0,10)}
                                    </div>
                                    <div className="comment-content">
                                        {comment.comment}
                                    </div>
                                </div>
                                })
                            }
                                
                                <div className="col-md-10 add-comment mt-2">
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        onCommentSubmitHandler(data._id)
                                    }}>
                                        
                                        <textarea onChange={commentInputHnadler} type="text" className="form-control" id="comment" name="comment"></textarea>
                                       
                                        
                                         <button className="btn btn-primary mt-2">Send</button>
                                    
                                    </form>
                                    
                                </div>
                        </div>
                    </div>
            }
        </div>
    )
}


export default Detail;