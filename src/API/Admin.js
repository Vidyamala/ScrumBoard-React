import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const createProject = async (Details) => {
  try {
    console.log(Details)
    const res = await axios.post(`${BASE_URL}/project`, Details, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(res,"resssss")
    return res.data;
  } catch (e) {
    return { Error: e.response.data.message };
  }
};
export const createSprint = async (Details) => {
    try {
      const res = await axios.post(`${BASE_URL}/sprint`, Details, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      
      return res.data;
    } catch (e) {
      return { Error: e.response.data.message };
    }
  };
  export const createPhase = async (Details) => {
    try {
      const res = await axios.post(`${BASE_URL}/phase`, Details, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      
      return res.data;
    } catch (e) {
      console.log(e)
      return { Error: e.message };
    }
  };
  export const createCategory = async (Details) => {
    try {
      const res = await axios.post(`${BASE_URL}/category`, Details, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      
      return res.data;
    } catch (e) {
      console.log(e)
      return { Error: e.message };
    }
  };
  export const getAllProject=async()=>{
    
    try{
    const res=await axios.get(`${BASE_URL}/project/all`,{headers:{
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
 export const approveUser=async(userId)=>{
    
  try{
  const res=await axios.put(`${BASE_URL}/projectmanagement/api/v1/user/${userId}?approve=true`,{},{headers:{
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
export const getAllUsers=async(status)=>{
    if(status){
      var url=`${BASE_URL}/projectmanagement/api/v1/user?status=PENDING`
    }
    else{
      var url=`${BASE_URL}/projectmanagement/api/v1/user`
    }
  try{
  const res=await axios.get(url,{headers:{
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
export const addEngineerToProject=async(userId,project)=>{
    
  try{
  const res=await axios.put(`${BASE_URL}/projectmanagement/api/v1/project/${userId}`,{project:project},{headers:{
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
