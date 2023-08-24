import axios from "axios";

export const getUserById=async(userId)=>{
    
    try{
    const res=await axios.get(`http://localhost:8888/projectmanagement/api/v1/user/${userId}`,{headers:{
        "x-access-token":localStorage.getItem("token")
    }})
     console.log(res.data,"response from getUserById")
     return res.data;
    }
    catch(e){
     console.log(e.response.data,"EEEEEEEEEEEEEE")
     return {"Error":e.response.data.message}
    }
 }
 