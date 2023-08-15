import axios from "axios";

export const getCategory=async()=>{
    
    try{
    const res=await axios.get("http://localhost:8888/category",{headers:{
        "x-access-token":localStorage.getItem("token")
    }})
     console.log(res.data,"response from getProject")
     return res.data;
    }
    catch(e){
     console.log(e.response.data,"EEEEEEEEEEEEEE")
     return {"Error":e.response.data.message}
    }
 }
 