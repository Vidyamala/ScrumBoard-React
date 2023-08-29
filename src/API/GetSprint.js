import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const getSprint=async(project,phase)=>{
    
    try{
    const res=await axios.get(`${BASE_URL}/sprint?project=${project}&phase=${phase}`,{headers:{
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