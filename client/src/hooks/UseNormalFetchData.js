import { useEffect, useState } from "react";


const useNormalFetchData = (url) => {
    const [data,setData] = useState(null);

    const fetchData = async () => {
        try {
            let res = await fetch(url);
            if (res.status === 200) {
                let resJSon = await res.json();
                setData(resJSon)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData();

        return () => fetchData();
    },[])

    return [data];
}

export {
    useNormalFetchData
}