import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const updateTask=async(id,Details)=>{
    
    try{
    const res=await axios.put(`${BASE_URL}/task/${id}`,{...Details},{headers:{
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