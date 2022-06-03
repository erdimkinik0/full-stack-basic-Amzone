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


const App = () => {
  const [{theme}] = useContext(ThemeContext);
  const [isLogged,setIsLogged] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("user")){
      console.log(isLogged);
      setIsLogged(true);  
    }
  },[isLogged])
  return (
    <div style={{backgroundColor:theme.backgroundColor, color:theme.color}}>
      <BrowserRouter>
        <Navbar isLogged={isLogged} />
        <LowerNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id/detail" element={<Detail />}/>
          <Route path="/login" element={<Login setIsLogged={setIsLogged}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;