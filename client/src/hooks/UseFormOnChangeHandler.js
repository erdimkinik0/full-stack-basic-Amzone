import { useState } from "react"
const useRegisterCustomerFormHandler = () => {
    const [inputData,setInputData] = useState({
        email:"",
        username:"",
        password:"",
        firstname:"",
        lastname:"",
        country:"",
        city:"",
        street:"",
        zip:null,
    });
    const onChangeHandler = (e) => {
        setInputData({
            ...inputData,[e.target.name]:e.target.value
        })
    }
    return [inputData,onChangeHandler];
}
const useRegisterCompanyFormHandler = () => {
    const [inputData,setInputData] = useState({
        email:"",
        username:"",
        password:"",
        company_name:"",
        country:"",
        city:"",
        street:"",
        zip:null,
    })
    const onChangeHandler = (e) => {
        setInputData({
            ...inputData,[e.target.name]:e.target.value
        })
    }
    return [inputData,onChangeHandler];
}
const useLoginFormHandler = () => {
    const [inputData,setInputData] = useState({
        email:"",
        password:""
    })
    const onChangeHandler = (e) => {
        setInputData({
            ...inputData,[e.target.name]:e.target.value
        })
    }
   
    return [inputData,onChangeHandler];
}

const useAdvertFormHandler = () => {
    const [inputData,setInputData] = useState({
        title:"",
        category:"",
        content:""
    })
    const onChangeHandler = (e) => {
        setInputData({
            ...inputData,[e.target.name]:e.target.value
        })
    } 

    return [inputData,onChangeHandler]
}

const useProductFormHandler = () => {
    const [inputData,setInputData] = useState({
        name:"",
        description:"",
        status:"",
        price:null,
        storage:null,
    })
    
    const onChangeHandler = (e) => {
        setInputData({
            ...inputData,[e.target.name]:e.target.value
        })
    }
   
    return [inputData,onChangeHandler];
}

const useOrderFormHandler = () => {
    const [inputData,setInputData] = useState({
        to_coutnry:"",
        to_city:"",
        to_street:""
    })
    const onChangeHandler = (e) => {
        setInputData({
            ...inputData,[e.target.name]:e.target.value
        })
    }

    return [inputData,onChangeHandler]
}

export {
    useRegisterCustomerFormHandler,
    useRegisterCompanyFormHandler,
    useLoginFormHandler,
    useAdvertFormHandler,
    useProductFormHandler,
    useOrderFormHandler
}