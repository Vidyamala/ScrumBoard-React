import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const getWave=async(project)=>{
    
    try{
    const res=await axios.get(`${BASE_URL}/phase?project=${project}`,{headers:{
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
 