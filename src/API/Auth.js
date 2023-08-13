import axios from "axios"
export const signup=async(userDetails)=>{
  
   try{
   const res=await axios.post("http://localhost:8888/projectmanagement/api/v1/register",
        userDetails
    )
    console.log(res,"response from reg")
    return res.data;
   }
   catch(e){
    console.log(e.response.data,"EEEEEEEEEEEEEE")
    return {"Error":e.response.data.message}
   }
}
export const login=async(userDetails)=>{
    
   try{
   const res=await axios.post("http://localhost:8888/projectmanagement/api/v1/login",
        userDetails
    )
    console.log(res,"response from login")
    return res.data;
   }
   catch(e){
    console.log(e.response.data,"EEEEEEEEEEEEEE")
    return {"Error":e.response.data.message}
   }
}