import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEngineerToProject, approveUser, createCategory, createPhase, createProject, createSprint, getAllProject, getAllUsers } from "../../API/Admin";
import { getWave } from "../../API/GetWave";
import useWindowSize from "../../CustomHooks/WindowSize";
import "./Admin.css"
function Admin(){
    const [projectName,setProjectName]=useState("");
    const [category,setCategory]=useState("");
    const [phase,setPhase]=useState("");
    const [sprint,setSprint]=useState("");
    const [userId,setUserId]=useState("");
    const [newProject,setNewProject]=useState("");
    const [success,setSuccess]=useState("");
    const [projectList,setProjectList]=useState([]);
    const [availableusers,setAvailableUsers]=useState([]);
    const [pendingUsers,setPendingUsers]=useState([]);
    const [engineerName,setEngineerName]=useState("");
    const [engineerProject,setEngineerProject]=useState("");
    const [projectphase,setProjectPhase]=useState("");
    const [projectSprint,setProjectSprint]=useState("");
    const[phaseSprint,setPhaseSprint]=useState([]);
    const [phaseRes,setPhaseRes]=useState([])
    const navigater=useNavigate()
    const handleLogout=()=>{
        localStorage.clear();
        navigater("/")
       }
       const handleAddProject=async()=>{
        const projectcreated=await createProject({project:projectName});
       
        setSuccess("Project added successfully!")
        setProjectName("")
       };
       const handleProjectName=(e)=>{
       
        setProjectName(e.target.value);
       
       }
       const handleAddCategory=async()=>{
           await createCategory({category:category})
           setSuccess("Category added successfully!")
           setCategory("")

       }
       const handleApprove=async()=>{
        if(userId!="--Users--" && userId!=""){
            await approveUser(userId)
            setSuccess("User approved Successfully")
        }
       else{
        setSuccess("Provide valid userId")
       } 
       
       }
       useEffect(()=>{
            setTimeout(()=>{
                setSuccess("")
            },5000)
       },[success]);
       useEffect(()=>{
        (async()=>{
           var proj= await getAllProject();
           setProjectList([...proj]);
           var pendingUsers=await getAllUsers({status:"PENDING"});
           setPendingUsers([...pendingUsers]);
           var availableusers=await getAllUsers();
           setAvailableUsers([...availableusers])
        })()
       },[]);
       const handleProjectSelect=async(e)=>{
        setProjectSprint(e.target.value);
        if(e.target.value!="--Project--" ){
          const wave=await getWave(e.target.value);
          setPhaseRes(wave);
          
        }
        
      }
       const handleAddPhase=async()=>{
        console.log("inside add phase",projectphase,phase)
      if(projectphase && projectphase!="--Project--" && phase && phase!="--Phase--"){
       await createPhase({project:projectphase,phase:phase});
       setSuccess(`${phase} added to ${projectphase}`);
      }
      else{
        setSuccess("Invalid project/phase");
      }
       }
       const handleAddSprint=async()=>{
        console.log("inside handle sprint",projectSprint,phaseSprint,sprint);
        if(projectSprint && phaseSprint && sprint && projectSprint!="--Project--" && phaseSprint!="--Sprint--"){
            await createSprint({project:projectSprint,phase:phaseSprint,sprint:sprint});
            setSuccess(`${sprint} sprint added to ${projectSprint} ${phaseSprint} successfully!`)
        }
        else{
            setSuccess("Invalid project/phase/sprint")
        }
       }
     const handleAddEngineerToProject=async()=>{
       if(engineerName && engineerProject && engineerName!="--Users--" && engineerProject!="--Project--"){
        const res=await addEngineerToProject(engineerName,engineerProject);
        console.log(res,"response");
        setSuccess(`${engineerName} added to ${engineerProject} successfully!`)
       }
       else{
        setSuccess("Invalid UserId/ Project")
       }
     }
    const [width, height] = useWindowSize();
    return(
        <div className="main">
          
        <div className="main-conatiner">
        <div className='title-container'>

 
{width>450 && <h1 className='title text-center'>Admin Page</h1>}
{width<=450 && width>370 &&  <h2 className='title text-center'>Admin Page</h2>}
{width<=370 && width>320 &&<h4 className='title text-center'>Admin Page</h4>}
{width<=320 && <h5 className='title text-center'>Admin Page</h5>}
<button className='logout btn btn-danger' onClick={handleLogout} >{width>900?"Logout":<i class="fa fa-sign-out" aria-hidden="true"></i>}</button>
</div>
        <div className="container">
        <input type="text" value={projectName} onChange={handleProjectName} placeholder="Project name"></input>
        <button className="btn btn-primary" onClick={handleAddProject}>Add Project</button>
        </div>
        <div className="container">
        <input type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Category name"></input>
        <button className="btn btn-primary" onClick={handleAddCategory}>Add Category</button>
        </div>
        <div className="container">
            <select value={projectphase} onChange={(e)=>{setProjectPhase(e.target.value)}}>
                <option>--Project--</option>
                {projectList && projectList.map((i)=>{
                    return <option value={i}>{i}</option>
                })}
            </select>
            <input value={phase} onChange={(e)=>{setPhase(e.target.value)}} placeholder="Phase name"></input>
            <button className="btn btn-primary" onClick={handleAddPhase}>Add Phase</button>
        </div>
        <div className="container">
            <select value={projectSprint} onChange={handleProjectSelect}>
                <option>--Project--</option>
                {projectList && projectList.map((i)=>{
                    return <option value={i}>{i}</option>
                })}
            </select>
            <select value={phaseSprint} onChange={(e)=>{setPhaseSprint(e.target.value)}}>
                <option>--Phase--</option>
                {phaseRes && phaseRes.map((i)=>{
                    return <option value={i}>{i}</option>
                })}
            </select>
            <input value={sprint} onChange={(e)=>{setSprint(e.target.value)}} placeholder="Sprint name"></input>
            <button className="btn btn-primary" onClick={handleAddSprint}>Add Sprint</button>
        </div>
        <div className="container">
        <select value={engineerName} onChange={(e)=>{setEngineerName(e.target.value)}}>
                <option>--Users--</option>
                {availableusers && availableusers.map((i)=>{
                    return <option value={i}>{i}</option>
                })}
            </select>
            <select value={engineerProject} onChange={(e)=>setEngineerProject(e.target.value)}>
                <option>--Project--</option>
                {projectList && projectList.map((i)=>{
                    return <option value={i}>{i}</option>
                })}
            </select>
            <button className="btn btn-primary" onClick={handleAddEngineerToProject}>Add Engineer to Project</button>
        </div>
        <div className="action-container">
        <div className="container">
        <select value={userId} onChange={(e)=>{setUserId(e.target.value)}}>
                <option>--Users--</option>
                {pendingUsers && pendingUsers.map((i)=>{
                    return <option value={i}>{i}</option>
                })}
            </select>
            <button className="btn btn-primary" onClick={handleApprove}>Approve</button>
            </div>
            </div>
            {success && <h3>{success}</h3>}
        </div>
        </div>
    )
}
export default Admin;