import "../../css/Product.css";
import dummy1 from "../../assets/1.png"
import dummy2 from "../../assets/2.png"
import dummy3 from "../../assets/3.png"
import { useEffect } from "react";

const Detail = () => {
    useEffect(() => {
        const imgs = document.querySelectorAll('.img-select a');
        const imgBtns = [...imgs];
        let imgId = 1;
        imgBtns.forEach((imgItem) => {
            imgItem.addEventListener('click', (event) => {
                event.preventDefault();
                imgId = imgItem.dataset.id;
                slideImage();
            });
        });
        function slideImage() {
            const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
            document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
        }
        window.addEventListener('resize', slideImage);
        return () => {
            window.removeEventListener('resize', slideImage);
            imgBtns.forEach((imgItem) => {
                imgItem.removeEventListener('click',(event) => {
                    event.preventDefault();
                    imgId = imgItem.dataset.id;
                    slideImage();
                })
            })
        }
    },[]);
    return (
        <div>
            <div className="card-wrapper-m">
                <div className="card">
                    {/* card left  */}
                    <div className="product-imgs">
                        <div className="img-display">
                            <div className="img-showcase">
                                <img src={dummy1} alt="" />
                                <img src={dummy2} alt="" />
                                <img src={dummy3} alt="" />
                                <img src={dummy1} alt="" />
                            </div>
                        </div>
                        <div className="img-select">
                            <div className="img-item">
                                <a href="/" data-id="1">
                                    <img src={dummy1} alt="" />
                                </a>
                            </div>
                            <div className="img-item">
                                <a href="/" data-id="2">
                                    <img src={dummy2} alt="" />
                                </a>
                            </div>
                            <div className="img-item">
                                <a href="/" data-id="3">
                                    <img src={dummy3} alt="" />
                                </a>
                            </div>
                            <div className="img-item">
                                <a href="/" data-id="4">
                                    <img src={dummy1} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/*  card right  */}
                    <div className="product-content">
                        <h2 className="product-title">nike shoes</h2>
                        <a href="/" className="product-link">visit nike store</a>
                        <div className="product-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span>4.7(21)</span>
                        </div>

                        <div className="product-price">
                            <p className="last-price">Old Price: <span>$257.00</span></p>
                            <p className="new-price">New Price: <span>$249.00 (5%)</span></p>
                        </div>

                        <div className="product-detail">
                            <h2>about this item: </h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                            <ul>
                                <li>Color: <span>Black</span></li>
                                <li>Available: <span>in stock</span></li>
                                <li>Category: <span>Shoes</span></li>
                                <li>Shipping Area: <span>All over the world</span></li>
                                <li>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>

                        <div className="purchase-info">
                            <h5>In Stock (status)</h5> 
                            <input type="number" min="0"  />
                            <button type="button" className="btn">
                                Add to Cart <i className="fas fa-shopping-cart"></i>
                            </button>
                            <button type="button" className="btn">Buy Now</button>
                        </div>

                        <div className="social-links">
                            <p>Share At: </p>
                            <a href="/">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="/">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href="/">
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="comment-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                lala
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}


export default Detail;