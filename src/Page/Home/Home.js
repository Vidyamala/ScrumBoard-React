import Button from '../../Components/Button/Button';
import DropDown from '../../Components/DropDown/DropDown';
import './Home.css'
import {data} from "../../DummyData/Data"
import {createContext, useContext, useEffect, useRef, useState} from "react"
import ViewTask from '../../Components/ViewOrUpdateTask/ViewOrUpdateTask';
export const context = createContext();
function Home() {
const [showViewTask,setShowViewTask]=useState(false);
const [open,setOpen]=useState([...data]);
const [closed,setClosed]=useState([...data]);
const [inprogress,setInprogress]=useState([...data]);
const [blocked,setBlocked]=useState([...data])
const [startlist,setStartlist]=useState("");
const [endlist,setEndlist]=useState("");
const [startListIndex,setStartListIndex]=useState(null);
const [endListIndex,setEndListIndex]=useState(null);
const end=useRef(null);
const endenter=useRef(null);
const [update,setupdate]=useState(true);
const [isShow,setisShow]=useState(false);
const [selectedItem,setSelectedItem]=useState({  taskName: "",
createdBy: "Vidyamala S",
project: "",
sprint: "",
phase: "",
category: "",
status: "",
acceptanceCriteria: "",
assignee: "",
estimatedEffort:"",
priority:""});
useEffect(()=>{
console.log("hello",open)
  console.log(startlist,endlist,startListIndex,endListIndex)
  if(startlist==endlist){

    if(startListIndex!=endListIndex){
      var listitem=startlist=="open"?open:startlist=="inprogress"?inprogress:startlist=="blocked"?blocked:closed ;
      console.log(listitem)
      var selectedItem=listitem.splice(startListIndex,1);
      console.log(...selectedItem)
      listitem.splice(endListIndex,0,...selectedItem);
      setStartListIndex(null);
      setEndListIndex(null)
console.log(listitem)

     startlist=="open"?setOpen(listitem):startlist=="inprogress"?setInprogress(listitem):startlist=="blocked"?setBlocked(listitem):setClosed(listitem) ;

    }
   }
   if(startlist!=endlist){


      var startlistitem=startlist=="open"?open:startlist=="inprogress"?inprogress:startlist=="blocked"?blocked:closed ;
      var endlistitem=endlist=="open"?open:endlist=="inprogress"?inprogress:endlist=="blocked"?blocked:closed ;
      console.log(startlistitem)
      var selectedItem=startlistitem.splice(startListIndex,1);

      console.log(...selectedItem,startlistitem);
      endlistitem.splice(endListIndex,0,...selectedItem);
      console.log(endlistitem)
//       listitem.splice(endListIndex,0,...selectedItem);
      setStartListIndex(null);
      setEndListIndex(null)
// console.log(listitem)

     startlist=="open"?setOpen(startlistitem):startlist=="inprogress"?setInprogress(startlistitem):startlist=="blocked"?setBlocked(startlistitem):setClosed(startlistitem) ;
     endlist=="open"?setOpen(endlistitem):endlist=="inprogress"?setInprogress(endlistitem):endlist=="blocked"?setBlocked(endlistitem):setClosed(endlistitem) ;

     console.log(open,inprogress,blocked,closed)

   }

},[endlist,update])

  const handleDragStart = (e, index,listname) => {

    setStartlist(listname);
    setStartListIndex(index);
    console.log("start",listname,index,e);

  }
  const handleDragEnter = (e, index,listname) => {
    endenter.current=listname
    setEndListIndex(index);
    console.log("Enter",listname,index);
  }
  const handleDragEnd = (e, index,listname) => {
console.log("hero",end.current,endenter.current)
    if(endenter.current!=end.current){
      console.log(endlist)
      let temp=end.current;
      var listitem=temp=="open"?open:temp=="inprogress"?inprogress:temp=="blocked"?blocked:closed ;
      console.log(listitem.length)
      setEndListIndex(listitem.length);
  }
 if(endlist==end.current){
  setupdate(!update);
 }

      let temp=end.current;
      console.log(temp)
          setEndlist(temp);



      console.log(endlist)

    console.log(endlist,"endlist",end.current)


    console.log("End",listname,index,e)

  }
  const handleDoubleClick=(item)=>{
    console.log("neeeeeee");
    console.log(item)
    setSelectedItem(item);
    console.log("in home selected", selectedItem)
    console.log(showViewTask)
    setShowViewTask(true);

    console.log(showViewTask)
    console.log("how are you buddyyyyyyyyyyyy");
  }

  const handledivdrop=(e,listtype)=>{
    e.preventDefault();
    end.current=listtype;
    console.log("hello",end.current);
  }
  const [query,setQuery]=useState("");
  return (<>

<div className='container-fluid cont'>
<h1 className='text-center'>Project Management</h1>
<div className='nav'><DropDown opt={["Project 1","Project2"]} placeholder={"Project"}/>
<DropDown opt={["wave1","wave2"]} placeholder={"Phase"}/>
<DropDown opt={["sprint1","sprint2"]} placeholder={"Sprint"}/>
<DropDown opt={["Development","Testing"]} placeholder={"Category"}/>
<button className='btn btn-secondary' style={{ color: "wheat", "padding": "0.5rem 1rem", borderRadius: "1rem",letterSpacing: "0.1rem"}}> Get Task</button>
<Button />
<div className='searchbar'>

<input  value={query} onChange={(e)=>{setQuery(e.target.value.toLowerCase())}} className='navInput' type='text' placeholder='Search..' />
<i class="bi bi-search"></i>
</div>
</div>
    <div className="containerr">

      <div className="items" onDragOver={(e)=>{handledivdrop(e,"open")}} >
      <div className='item-header'>  <h2>OPEN</h2><div className='count'>{open.length}</div></div>
        <hr />
        {

          open.filter((e)=>{
            return e.taskName.toLowerCase().includes(query);
          }).map((item, index) => {
            return (
              <li key={index} draggable
              onDragStart={(e) => handleDragStart(e, index,"open")}
              onDragEnter={(e) => handleDragEnter(e, index,"open")}
              onDragEnd={(e) => handleDragEnd(e, index,"open")}
              onDoubleClick={()=>handleDoubleClick(item)}>
                <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority=="High"?"custbadge bg-danger":(item.priority=="Medium")?"custbadge bg-warning text-dark":"custbadge bg-success"}`}>{item.priority}</span><div className="custbadge custbadge-assignee">{item.assignee}</div></div></div>
              </li>
            )
          })
        }</div>
      <div className="items" onDragOver={(e)=>{handledivdrop(e,"inprogress")}}>
      <div className='item-header'>  <h2>Inprogress</h2><div className='count'>{inprogress.length}</div></div>
        <hr />
        {inprogress.filter((e)=>{
            return e.taskName.toLowerCase().includes(query);
          }).map((item, index) => {
          return (
            <li key={index} draggable
             onDragStart={(e) => handleDragStart(e, index,"inprogress")}
             onDragEnter={(e) => handleDragEnter(e, index,"inprogress")}
             onDragEnd={(e) => handleDragEnd(e, index,"inprogress")}
             onDoubleClick={()=>handleDoubleClick(item)}>
             <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority=="High"?"custbadge bg-danger":(item.priority=="Medium")?"custbadge bg-warning text-dark":"custbadge bg-success"}`}>{item.priority}</span><span className="custbadge custbadge-assignee">{item.assignee}</span></div></div>
            </li>
          )
        })
        }</div>
      <div className="items" onDragOver={(e)=>{handledivdrop(e,"blocked")}}>
      <div className='item-header'>  <h2>Blocked</h2><div className='count'>{blocked.length}</div></div>
        <hr />
        {blocked.filter((e)=>{
            return e.taskName.toLowerCase().includes(query);
          }).map((item, index) => {
          return (
            <li key={index} draggable
             onDragStart={(e) => handleDragStart(e, index,"blocked")}
             onDragEnter={(e) => handleDragEnter(e, index,"blocked")}
             onDragEnd={(e) => handleDragEnd(e, index,"blocked")}
             onDoubleClick={()=>handleDoubleClick(item)}>
             <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority=="High"?"custbadge bg-danger":(item.priority=="Medium")?"custbadge bg-warning text-dark":"custbadge bg-success"}`}>{item.priority}</span><span className="custbadge custbadge-assignee">{item.assignee}</span></div></div>
            </li>
          )
        })
        }</div>
      <div className="items" onDragOver={(e)=>{handledivdrop(e,"closed")}}>
      <div className='item-header'>  <h2>Completed</h2><div className='count'>{closed.length}</div></div>
        <hr />
        {closed.filter((e)=>{
            return e.taskName.toLowerCase().includes(query);
          }).map((item, index) => {
          return (
            <li key={index} draggable
            onDragStart={(e) => handleDragStart(e, index,"closed")}
            onDragEnter={(e) => handleDragEnter(e, index,"closed")}
            onDragEnd={(e) => handleDragEnd(e, index,"closed")}
            onDoubleClick={()=>handleDoubleClick(item)}>
                <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority=="High"?"custbadge bg-danger":(item.priority=="Medium")?"custbadge bg-warning text-dark":"custbadge bg-success"}`}>{item.priority}</span><span className="custbadge custbadge-assignee">{item.assignee}</span></div></div>
            </li>
          )
        })
        }</div>
      </div>
    </div>
    <context.Provider value={selectedItem}>
    <ViewTask showViewTask={showViewTask} setShowViewTask={setShowViewTask}  title="Hello"/>
    </context.Provider>
    </>
  )
}
export default Home;