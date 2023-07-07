import { useState } from "react";
import "./Button.css"
import AddTaskModal from "../AddTask_modal/AddTask_modal";
function Button(){
    const [showAddTaskModal,setShowAddTaskModal]=useState(false);
    return (
        <div className="button">
         <button className={"btn btn-danger"} onClick={()=>{setShowAddTaskModal(true)}}>Add Task <i class="bi bi-plus-lg"></i></button>
         <AddTaskModal title={"Add Task"}  showAddTaskModal={showAddTaskModal} setShowAddTaskModal={setShowAddTaskModal}/>
        </div>
    )
}
export default Button;