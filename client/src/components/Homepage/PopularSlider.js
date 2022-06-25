import React, { useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useState } from "react";
const PopularSlider = (props) => {

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    variableWidth: true,
  };
  
  const [data,setData] = useState([])
  useEffect(() => {
    const fetchData = async() => {
      try{
        let res = await fetch("http://localhost:5000/products/discounts");
        if(res.status === 200){
          let resJson = await res.json();
          setData(resJson);

        }
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[])



  return (
    <div className="container">

      <Slider {...settings}>

        {
          data &&
            data.slice(0,10).map((product) => {
              return <div className="slider-container">
                <Link to={`products/${product._id}/detail`}><img src={`http://localhost:5000/${product.img}`} alt="productimage" /></Link>
                <div className="d-flex justify-content-around products-cont">
                <p style={{fontSize:"1rem",color:"red",fontWeight:"500"}}>{product.discount}%</p>
                  <p style={{fontSize:"1rem"}}>${product.price}</p>
                  <p style={{fontSize:"1rem"}}>{product.name.slice(0, 10)}...</p>
                  <span>
                    <input onChange={props.onQuantityChangeHandler} style={{color:"rgb(122, 119, 119)", width: "28px", height: "28px",background:"transparent",border:"none",textAlign:"center",fontWeight:"600",fontSize:"14px"}} type="number" defaultValue={0} />
                    <button onClick={(e) => {
                      e.preventDefault()
                      props.addItemtoCart(product._id)}} style={{padding:"0%"}}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
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


export default PopularSlider;