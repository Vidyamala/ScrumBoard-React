import axios from "axios";

export const getProject=async()=>{
    
    try{
    const res=await axios.get("http://localhost:8888/project",{headers:{
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
 