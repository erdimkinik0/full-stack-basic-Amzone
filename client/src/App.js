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
import Products from "./components/Dashboard/Products/Products";
import ProductCreate from "./components/Dashboard/Products/ProductCreate";
import Adverts from "./components/Dashboard/Adverts/Adverts";
import AdvertCreate from "./components/Dashboard/Adverts/AdvertCreate";
import Orders from "./components/Orders/Orders";
import OrderCreate from "./components/Orders/OrderCreate";


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
      <BrowserRouter>
        <Navbar 
          isLogged={isLogged} 
          refreshToken={refreshToken} 
          setRefreshToken={setRefreshToken} 
          setAccessToken={setAccessToken} 
          accessToken={accessToken} 
          userType={userType} 
          setIsLogged={setIsLogged}
        />
        {console.log(userType)}
        <LowerNavbar isLogged={isLogged} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/:id/detail" element={<Detail />} />
          <Route path="login" element={
            <Login 
              setIsLogged={setIsLogged} 
              setRefreshToken={setRefreshToken} 
              setAccessToken={setAccessToken} 
              setUserType={setUserType} 
              isLogged={isLogged} 
            />} />
          <Route path="register" element={<Register />} />
          <Route path="register/customer" element={<CustomerRegister />} />
          <Route path="register/company" element={<CompanyRegister />} />
          <Route path="dashboard" element={<Dashboard accessToken={accessToken} />} />
          <Route path="products/list" element={<Products setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="products/list/create" element={<ProductCreate setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="adverts/list" element={<Adverts setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="adverts/list/create" element={<AdvertCreate setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="orders" element={<Orders setIsLogged={setIsLogged} refreshToken={refreshToken} accessToken={accessToken} />} />
          <Route path="orders/create" element={<OrderCreate setIsLogged={setIsLogged} accessToken={accessToken} refreshToken={refreshToken} />} />
 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;