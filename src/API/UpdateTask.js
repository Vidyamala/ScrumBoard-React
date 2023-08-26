import axios from "axios";
export const updateTask=async(id,Details)=>{
    
    try{
    const res=await axios.put(`http://localhost:8888/task/${id}`,{...Details},{headers:{
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