import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const getProject=async()=>{
    
    try{
    const res=await axios.get(`${BASE_URL}/project`,{headers:{
        "x-access-token":localStorage.getItem("token")
    }})
     console.log(res.data.project,"response from getProject")
     return res.data.project;
    }
    catch(e){
     console.log(e.response.data,"EEEEEEEEEEEEEE")
     return {"Error":e.response.data.message}
    }
 }
 