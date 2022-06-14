import { createContext,useEffect,useState } from "react"

const themes = {
    dark:{
        backgroundColor: "#232f3e",
        color:"white",
        boxShadow:"inset 0px 0px 0px 1px white"
    },
    light:{
        backgroundColor:"whitesmoke",
        color:"black",
        boxShadow:"inset 0px 0px 0px 1px black"
        
    }
}

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [isDark,setIsDark] = useState(false);
    const theme = isDark ? themes.dark : themes.light;
    const toggleTheme = () => {
        localStorage.setItem("isDark",!isDark);
        setIsDark(!isDark);
    }
    useEffect(() => {
        const isDark = localStorage.getItem("isDark") === "true";
        setIsDark(isDark);
    },[])


    return <ThemeContext.Provider value={[{isDark,theme},toggleTheme]}>
        {children}
    </ThemeContext.Provider>
}

export {ThemeContext,ThemeProvider};

