import React from "react";
import Slider from "react-slick";
import { useNormalFetchData } from "../../hooks/UseNormalFetchData";
import { Link } from "react-router-dom";

const MySlider = (props) => {

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    variableWidth: true,
  };
  const [data] = useNormalFetchData("http://localhost:5000/products/bests");



  return (
    <div className="container">

      <Slider {...settings}>

        {
          data &&
          data.map((product) => {
            return <div className="slider-container">
              <Link to={`products/${product._id}/detail`}><img src={`http://localhost:5000/${product.img}`} alt="productimage" /></Link>
              <div className="d-flex justify-content-around products-cont">
                <p>${product.price}</p>
                <p>{product.name.slice(0, 10)}...</p>
                <span>
                  <input onChange={props.onQuantityChangeHandler} style={{ width: "30px", height: "30px",background:"transparent",border:"none",textAlign:"center",fontWeight:"600"}} type="number" defaultValue={0} />
                  <button onClick={(e) => {
                    e.preventDefault()
                    props.addItemtoCart(product._id)}} style={{padding:"0%"}}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                  </svg></button>
                </span>

              </div>

            </div>
          })
        }
       

      </Slider>
    </div>
  )
}


export default MySlider;