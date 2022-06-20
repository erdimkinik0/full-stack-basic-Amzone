import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css";
import { ThemeContext } from "./hooks/GlobalContext";
import { useContext, useEffect, useState } from "react";
// components
import { Navbar, LowerNavbar } from "./components/Navbar";
import Home from "./components/Homepage/Home";
import Footer from "./components/Footer";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CustomerRegister from "./components/Register/CustomerRegister";
import CompanyRegister from "./components/Register/CompanyRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductsList from "./components/Dashboard/Products/ProductsList";
import ProductCreate from "./components/Dashboard/Products/ProductCreate";
import AdvertsList from "./components/Dashboard/Adverts/AdvertsList";
import AdvertCreate from "./components/Dashboard/Adverts/AdvertCreate";
import OrdersList from "./components/Orders/OrdersList";
import OrderCreate from "./components/Orders/OrderCreate";
import Orders from "./components/Orders/Orders"
import Cart from "./components/Cart";
import Products from "./components/Dashboard/Products/Products";
import Adverts from "./components/Dashboard/Adverts/Adverts";



const App = () => {
  const [{ theme }] = useContext(ThemeContext);
  const [isLogged, setIsLogged] = useState(false);
  const [refreshToken, setRefreshToken] = useState({
    token: "",
  })
  const [accessToken, setAccessToken] = useState({
    token: "",
  })
  const [userType, setUserType] = useState(null);
  const [username,setUsername] = useState(null);

  const [quantityProd,setQuantityProd] = useState(0);

  const onQuantityChangeHandler = (e) => {
    setQuantityProd(e.target.value);
  }
  const [cart,setCart] = useState([]);

  const addItemtoCart = async (productId) => {
      try{
        let cart_item = {
          product_id:productId,
          quantity:quantityProd
        }

        let res = await fetch("http://localhost:5000/cart/add",{
            method:"post",
            body:JSON.stringify(cart_item),
            headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${accessToken.token}`
            }
        })

        if(res.status === 200){
          setCart([
            ...cart,cart_item
          ])
          console.log(cart)
          setQuantityProd(0);
        }


       

      }catch(err){
        console.log(err)
      }
  }

  useEffect(() => {
    let now = parseInt(new Date().getTime())
    let setupTime = parseInt(localStorage.getItem("setupTime"));
    setUserType(localStorage.getItem("userType"))

    if (now - setupTime < 30 * 60 * 1000) {
      setIsLogged(true);
      setRefreshToken({
        token: localStorage.getItem("refreshToken"),
      })
      setAccessToken({
        token: localStorage.getItem("accessToken"),
      })
      setUserType(localStorage.getItem("userType"))
    }

  },[isLogged])

  return (
    <div style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      {console.log(cart)}
      {console.log(quantityProd)}
      <BrowserRouter>
        <Navbar 
          isLogged={isLogged} 
          refreshToken={refreshToken} 
          setRefreshToken={setRefreshToken} 
          setAccessToken={setAccessToken} 
          accessToken={accessToken} 
          userType={userType} 
          setIsLogged={setIsLogged}
          username={username}
          cart={cart}
        />
        {console.log(userType)}
        {console.log(cart)}
        <LowerNavbar isLogged={isLogged} />
        <Routes>
          <Route path="/" element={<Home onQuantityChangeHandler={onQuantityChangeHandler} addItemtoCart={addItemtoCart}/>} />
          <Route path="products/:id/detail" element={<Detail />} />
          <Route path="login" element={
            <Login 
              setIsLogged={setIsLogged} 
              setRefreshToken={setRefreshToken} 
              setAccessToken={setAccessToken} 
              setUserType={setUserType} 
              isLogged={isLogged} 
              setUsername={setUsername}
              setCart={setCart}
            />} />
          <Route path="register" element={<Register />} />
            <Route path="register/customer" element={<CustomerRegister />} />
            <Route path="register/company" element={<CompanyRegister />} />
          <Route path="dashboard" element={<Dashboard accessToken={accessToken} />} />
          <Route path="products" element={<Products />} />
          <Route path="products/list" element={<ProductsList setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="products/list/create" element={<ProductCreate setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="adverts/list" element={<AdvertsList setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="adverts/list/create" element={<AdvertCreate setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="/adverts" element={<Adverts />}/>
          <Route path="orders/list" element={<OrdersList setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="orders" element={<Orders setIsLogged={setIsLogged} accessToken={accessToken} refreshToken={refreshToken} />} />
          <Route path="orders/list/create" element={<OrderCreate setIsLogged={setIsLogged} accessToken={accessToken} refreshToken={refreshToken} />} />
          <Route path="cart" element={<Cart cart={cart} setCart={setCart} accessToken={accessToken} refreshToken={refreshToken} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;