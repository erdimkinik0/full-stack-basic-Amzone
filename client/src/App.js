import {BrowserRouter , Routes , Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css";
import { ThemeContext } from "./hooks/GlobalContext";
import { useContext } from "react";
// components
import {Navbar,LowerNavbar} from "./components/Navbar";
import Home from "./components/Homepage/Home";
import Footer from "./components/Footer";




const App = () => {
  const [{theme}] = useContext(ThemeContext);

  return (
    <div style={{backgroundColor:theme.backgroundColor, color:theme.color}}>
      <BrowserRouter>
        <Navbar />
        <LowerNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;