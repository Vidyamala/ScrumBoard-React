import axios from "axios";

export const getTasks=async(project,phase,sprint,category)=>{
    
    try{
    const res=await axios.get(`http://localhost:8888/task?project=${project}&phase=${phase}&sprint=${sprint}&category=${category}`,{headers:{
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
 