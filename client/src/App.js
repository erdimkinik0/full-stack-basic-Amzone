import {BrowserRouter , Routes , Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css";
import { ThemeContext } from "./hooks/GlobalContext";
import { useContext, useEffect, useState } from "react";
// components
import {Navbar,LowerNavbar} from "./components/Navbar";
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

const App = () => {
  const [{theme}] = useContext(ThemeContext);
  const [isLogged,setIsLogged] = useState(false);
  const [refreshToken,setToken] = useState({
    token:"",
  })
  
  useEffect(() => {
  if(localStorage.getItem("refreshToken")){
      setToken({
          token:localStorage.getItem("refreshToken")
      })
  }
  },[])
  useEffect(() => {
    if(localStorage.getItem("accessToken")){
      console.log(isLogged);
      setIsLogged(true);  
    }
    if (isLogged){
      let now = parseInt(new Date().getTime())
      let setupTime = parseInt(localStorage.getItem("setupTime"));
      
    if(now - setupTime > 60*1000){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("setupTime")
        setIsLogged(false);
    }
  }
  },[isLogged])


  return (
    <div style={{backgroundColor:theme.backgroundColor, color:theme.color}}>
      <BrowserRouter>
        <Navbar isLogged={isLogged}  refreshToken={refreshToken} setToken={setToken}/>
        <LowerNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/:id/detail" element={<Detail />}/>
          <Route path="login" element={<Login setIsLogged={setIsLogged} setToken={setToken}/>} />
          <Route path="register" element={<Register />} />
            <Route path="register/customer" element={<CustomerRegister />} />
            <Route path="register/company" element={<CompanyRegister />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
            <Route path="products/create" element={<ProductCreate />} />
          <Route path="adverts" element={<Adverts />} />
            <Route path="adverts/create" element={<AdvertCreate setIsLogged={setIsLogged} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;