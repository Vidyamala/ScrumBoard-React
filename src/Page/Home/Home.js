import Button from '../../Components/Button/Button';
import DropDown from '../../Components/DropDown/DropDown';
import './Home.css'
import { data } from "../../DummyData/Data"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import ViewTask from '../../Components/ViewOrUpdateTask/ViewOrUpdateTask';
import { appcontext } from '../../App';
import { getProject } from '../../API/GetProject';
import { getWave } from '../../API/GetWave';
import { getSprint } from '../../API/GetSprint';
import { getCategory } from '../../API/GetCategory';
import { getTasks } from '../../API/GetTask';
import { getUserById } from '../../API/GetUserById';
import useWindowSize from '../../CustomHooks/WindowSize';
import { Link, useNavigate } from 'react-router-dom';
import { updateTask } from '../../API/UpdateTask';
export const context = createContext();
function Home() {
  useEffect(() => {
    var userId = localStorage.getItem("userId");
    if (!userId) {
      navigater("/unauthenticated")
    }
  })
  const navigater = useNavigate();
  const [showViewTask, setShowViewTask] = useState(false);
  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [blocked, setBlocked] = useState([])
  const [startlist, setStartlist] = useState("");
  const [endlist, setEndlist] = useState("");
  const [startListIndex, setStartListIndex] = useState(null);
  const [endListIndex, setEndListIndex] = useState(null);
  const end = useRef(null);
  const endenter = useRef(null);
  const [update, setupdate] = useState(true);
  const { loggedUser, setLoggedUser } = useContext(appcontext);
  const [isShow, setisShow] = useState(false);
  const [projectGetTask, setprojectGetTask] = useState([]);
  const [waveGetTask, setWaveGetTask] = useState([]);
  const [sprintGetTask, setSprintGetTask] = useState([]);
  const [categoryGetTask, setCategoryGetTask] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedWave, setSelectedWave] = useState("");
  const [selectedSprint, setSelectedSprint] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedError, setSelectedError] = useState("")
  const handleProjectSelect = async (e) => {
    setSelectedProject(e.target.value);
    if (e.target.value != "--Project--") {
      setSelectedError("")
      const wave = await getWave(e.target.value);
      setWaveGetTask(wave);
      setSprintGetTask([]);
      setCategoryGetTask([]);
    }
    else {
      setWaveGetTask([]);
      setSprintGetTask([]);
      setCategoryGetTask([]);
    }
  }

  const handleWaveSelect = async (e) => {
    setSelectedWave(e.target.value);
    if (e.target.value != "--Phase--") {
      setSelectedError("")
      const sprint = await getSprint(selectedProject, e.target.value);
      console.log(sprint, "Sprint")
      setSprintGetTask([...sprint]);
      setCategoryGetTask([]);
    }
    else {
      setSprintGetTask([]);
      setCategoryGetTask([]);
    }
  }
  const handleSprintSelect = async (e) => {
    setSelectedSprint(e.target.value);
    if (e.target.value != "--Sprint--") {
      setSelectedError("")
      var category = await getCategory();
      setCategoryGetTask(category)
    }
    else {
      setCategoryGetTask([]);
    }
  }
  const handleCategorySelect = (e) => {
    if (e.target.value != "--Category--") {
      setSelectedError("")
    }
    setSelectedCategory(e.target.value);
  }
  const tasks = {
    inprogress: [],
    closed: [],
    blocked: [],
    todo: []
  }
  const getTask = async () => {

    if (selectedProject != "--Project--" && selectedProject) {
      console.log("--Project--", selectedProject)
      if (selectedWave != "--Phase--" && selectedWave) {
        if (selectedSprint != "--Sprint--" && selectedSprint) {
          if (selectedCategory != "--Category--" && selectedCategory) {
            console.log(selectedProject, selectedWave, selectedSprint, selectedCategory)
            const Tasks = await getTasks(selectedProject, selectedWave, selectedSprint, selectedCategory);
            console.log(Tasks, "Finally get task");
            Tasks.map((e) => {
              console.log(e, e.status)
              if (e.status == "todo") {
                tasks.todo.push(e)
              }
              else if (e.status == "inprogress") {
                tasks.inprogress.push(e)
              }
              else if (e.status == "blocked") {
                tasks.blocked.push(e)
              }
              else if (e.status == "completed") {
                tasks.closed.push(e)
              }
            })
            console.log(tasks.todo)
            setOpen(tasks.todo);
            setBlocked(tasks.blocked);
            setClosed(tasks.closed);
            setInprogress(tasks.inprogress)
          }
          else {
            setSelectedError("--Category-- is not valid category")
          }
        }
        else {
          setSelectedError("--Sprint-- is not valid phase")
        }
      }
      else {
        setSelectedError("--Phase-- is not valid phase")
      }
    }
    else {
      setSelectedError("--Project-- is not valid Project")
    }
  }
  useEffect(() => {
    console.log(selectedError, "selected Error")
  }, [selectedError])
  const [selectedItem, setSelectedItem] = useState({
    taskName: "",
    createdBy: "Vidyamala S",
    project: "",
    sprint: "",
    phase: "",
    category: "",
    status: "",
    acceptanceCriteria: "",
    assignee: "",
    estimatedEffort: "",
    priority: ""
  });
  useEffect(() => {
    (async () => {
      const project = await getProject();
      setprojectGetTask(project);
    })();
  }, [])
  useEffect(() => {
    console.log(selectedProject, "projjjjjjjjjectttttt")
  }, [selectedProject])
  useEffect(() => {
    console.log("hello", open);

    var task = null
    if (startlist == "blocked") {
      task = blocked[startListIndex]
    }
    else if (startlist == "inprogress") {
      task = inprogress[startListIndex];
    }
    else if (startlist == "open") {
      task = open[startListIndex]
    }
    else {
      task = closed[startListIndex]
    }

    console.log(task, "Selected Task")
    if (task) {
      if (loggedUser.userType == "ADMIN" || task.assignee == loggedUser.userId || task.createdBy == loggedUser.userId) {



        console.log(startlist, endlist, startListIndex, endListIndex)
        if (startlist == endlist) {

          if (startListIndex != endListIndex) {
            var listitem = startlist == "open" ? open : startlist == "inprogress" ? inprogress : startlist == "blocked" ? blocked : closed;
            console.log(listitem)
            var selectedItem = listitem.splice(startListIndex, 1);
            console.log(...selectedItem)
            listitem.splice(endListIndex, 0, ...selectedItem);
            setStartListIndex(null);
            setEndListIndex(null)
            console.log(listitem)

            startlist == "open" ? setOpen(listitem) : startlist == "inprogress" ? setInprogress(listitem) : startlist == "blocked" ? setBlocked(listitem) : setClosed(listitem);

          }
        }
        if (startlist != endlist) {
          var Details = {}
          if (endlist == "open") {
            Details.status = "todo"
          }
          else if (endlist == "inprogress") {
            Details.status = "inprogress"
          }
          else if (endlist == "blocked") {
            Details.status = "blocked"
          }
          else {
            Details.status = "completed"
          }
          (async () => {
            await updateTask(task._id, Details)
          })()
          var startlistitem = startlist == "open" ? open : startlist == "inprogress" ? inprogress : startlist == "blocked" ? blocked : closed;
          var endlistitem = endlist == "open" ? open : endlist == "inprogress" ? inprogress : endlist == "blocked" ? blocked : closed;
          console.log(startlistitem)
          var selectedItem = startlistitem.splice(startListIndex, 1);

          console.log(...selectedItem, startlistitem);
          endlistitem.splice(endListIndex, 0, ...selectedItem);
          console.log(endlistitem)
          //       listitem.splice(endListIndex,0,...selectedItem);
          setStartListIndex(null);
          setEndListIndex(null)
          // console.log(listitem)

          startlist == "open" ? setOpen(startlistitem) : startlist == "inprogress" ? setInprogress(startlistitem) : startlist == "blocked" ? setBlocked(startlistitem) : setClosed(startlistitem);
          endlist == "open" ? setOpen(endlistitem) : endlist == "inprogress" ? setInprogress(endlistitem) : endlist == "blocked" ? setBlocked(endlistitem) : setClosed(endlistitem);

          console.log(open, inprogress, blocked, closed)

        }
      }
    }
  }, [endlist, update])

  const handleDragStart = (e, index, listname) => {

    setStartlist(listname);
    setStartListIndex(index);
    console.log("start", listname, index, e);

  }
  const handleDragEnter = (e, index, listname) => {
    endenter.current = listname
    setEndListIndex(index);
    console.log("Enter", listname, index);
  }
  const handleDragEnd = (e, index, listname) => {
    console.log("hero", end.current, endenter.current)
    if (endenter.current != end.current) {
      console.log(endlist)
      let temp = end.current;
      var listitem = temp == "open" ? open : temp == "inprogress" ? inprogress : temp == "blocked" ? blocked : closed;
      console.log(listitem.length)
      setEndListIndex(listitem.length);
    }
    if (endlist == end.current) {
      setupdate(!update);
    }

    let temp = end.current;
    console.log(temp)
    setEndlist(temp);



    console.log(endlist)

    console.log(endlist, "endlist", end.current)


    console.log("End", listname, index, e)

  }
  const handleDoubleClick = (item) => {
    console.log("neeeeeee");
    console.log(item)
    setSelectedItem(item);
    console.log("in home selected", selectedItem)
    console.log(showViewTask)
    setShowViewTask(true);

    console.log(showViewTask)
    console.log("how are you buddyyyyyyyyyyyy");
  }

  const handledivdrop = (e, listtype) => {
    e.preventDefault();
    end.current = listtype;
    console.log("hello", end.current);
  }
  const [query, setQuery] = useState("");
  useEffect(
    () => {
      (async () => {
        var id = localStorage.getItem("userId")
        var res = await getUserById(id);
        console.log(res, "res from useEffect")

        setLoggedUser(res)
      })()
    }, [])
  useEffect(() => {
    console.log(loggedUser, "loggedUser in home.js")
  }, [loggedUser])
  const handleLogout = () => {
    localStorage.clear();
    navigater("/")
  }
  const [width, height] = useWindowSize();
  return (<>

    <div className='container-fluid cont'>
      <div className='title-container'>


        {width > 450 && <h1 className='title text-center'>Project Management</h1>}
        {width <= 450 && width > 370 && <h2 className='title text-center'>Project Management</h2>}
        {width <= 370 && width > 320 && <h4 className='title text-center'>Project Management</h4>}
        {width <= 320 && <h5 className='title text-center'>Project Management</h5>}
        <button className='logout btn btn-danger' onClick={handleLogout} >{width > 900 ? "Logout" : <i class="fa fa-sign-out" aria-hidden="true"></i>}</button>
      </div>
      {selectedError && <p className='text-center  text-danger' style={{ margin: 0 }}>{selectedError}</p>}
      <div className='nav'>
        <select onChange={handleProjectSelect} className="dropbtn">
          <option>--Project--</option>
          {projectGetTask.map((e) => {
            return <option>{e}</option>
          })}
        </select>
        <select onChange={handleWaveSelect} className="dropbtn">
          <option>--Phase--</option>
          {waveGetTask.map((e) => {
            return <option>{e}</option>
          })}
        </select>

        <select onChange={handleSprintSelect} className="dropbtn">
          <option>--Sprint--</option>
          {sprintGetTask.map((e) => {
            return <option>{e}</option>
          })}
        </select>


        <select onChange={handleCategorySelect} className="dropbtn">
          <option>--Category--</option>
          {categoryGetTask.map((e) => {
            return <option>{e}</option>
          })}
        </select>
        <button className='btn btn-secondary' style={{ color: "wheat", "padding": "0.5rem 1rem", borderRadius: "1rem", letterSpacing: "0.1rem" }} onClick={getTask}> Get Task</button>
        <Button />
        <div className='searchbar'>

          <input value={query} onChange={(e) => { setQuery(e.target.value.toLowerCase()) }} className='navInput' type='text' placeholder='Search..' />
          <i class="bi bi-search"></i>
        </div>
      </div>
      <div className="containerr">

        <div className="items" onDragOver={(e) => { handledivdrop(e, "open") }} >
          <div className='item-header'>  <h2>OPEN</h2><div className='count'>{open.length}</div></div>
          <hr />
          {

            open.length != 0 && open.filter((e) => {
              return e.taskName.toLowerCase().includes(query);
            }).map((item, index) => {
              return (
                <li key={index} draggable
                  onDragStart={(e) => handleDragStart(e, index, "open")}
                  onDragEnter={(e) => handleDragEnter(e, index, "open")}
                  onDragEnd={(e) => handleDragEnd(e, index, "open")}
                  onDoubleClick={() => handleDoubleClick(item)}>
                  <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority == "High" ? "custbadge bg-danger" : (item.priority == "Medium") ? "custbadge bg-warning text-dark" : "custbadge bg-success"}`}>{item.priority}</span><div className="custbadge custbadge-assignee">{item.assignee}</div></div></div>
                </li>
              )
            })
          }</div>
        <div className="items" onDragOver={(e) => { handledivdrop(e, "inprogress") }}>
          <div className='item-header'>  <h2>Inprogress</h2><div className='count'>{inprogress.length}</div></div>
          <hr />
          {inprogress.length != 0 && inprogress.filter((e) => {
            return e.taskName.toLowerCase().includes(query);
          }).map((item, index) => {
            return (
              <li key={index} draggable
                onDragStart={(e) => handleDragStart(e, index, "inprogress")}
                onDragEnter={(e) => handleDragEnter(e, index, "inprogress")}
                onDragEnd={(e) => handleDragEnd(e, index, "inprogress")}
                onDoubleClick={() => handleDoubleClick(item)}>
                <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority == "High" ? "custbadge bg-danger" : (item.priority == "Medium") ? "custbadge bg-warning text-dark" : "custbadge bg-success"}`}>{item.priority}</span><span className="custbadge custbadge-assignee">{item.assignee}</span></div></div>
              </li>
            )
          })
          }</div>
        <div className="items" onDragOver={(e) => { handledivdrop(e, "blocked") }}>
          <div className='item-header'>  <h2>Blocked</h2><div className='count'>{blocked.length}</div></div>
          <hr />
          {blocked.length != 0 && blocked.filter((e) => {
            return e.taskName.toLowerCase().includes(query);
          }).map((item, index) => {
            return (
              <li key={index} draggable
                onDragStart={(e) => handleDragStart(e, index, "blocked")}
                onDragEnter={(e) => handleDragEnter(e, index, "blocked")}
                onDragEnd={(e) => handleDragEnd(e, index, "blocked")}
                onDoubleClick={() => handleDoubleClick(item)}>
                <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority == "High" ? "custbadge bg-danger" : (item.priority == "Medium") ? "custbadge bg-warning text-dark" : "custbadge bg-success"}`}>{item.priority}</span><span className="custbadge custbadge-assignee">{item.assignee}</span></div></div>
              </li>
            )
          })
          }</div>
        <div className="items" onDragOver={(e) => { handledivdrop(e, "closed") }}>
          <div className='item-header'>  <h2>Completed</h2><div className='count'>{closed.length}</div></div>
          <hr />
          {closed.length != 0 && closed.filter((e) => {
            return e.taskName.toLowerCase().includes(query);
          }).map((item, index) => {
            return (
              <li key={index} draggable
                onDragStart={(e) => handleDragStart(e, index, "closed")}
                onDragEnter={(e) => handleDragEnter(e, index, "closed")}
                onDragEnd={(e) => handleDragEnd(e, index, "closed")}
                onDoubleClick={() => handleDoubleClick(item)}>
                <div>{item.taskName}  <div className='iteminfo'> <span className={`${item.priority == "High" ? "custbadge bg-danger" : (item.priority == "Medium") ? "custbadge bg-warning text-dark" : "custbadge bg-success"}`}>{item.priority}</span><span className="custbadge custbadge-assignee">{item.assignee}</span></div></div>
              </li>
            )
          })
          }</div>
      </div>
    </div>
    <context.Provider value={{ selectedItem, projectGetTask, categoryGetTask }}>
      <ViewTask showViewTask={showViewTask} setShowViewTask={setShowViewTask} title="Hello" />
    </context.Provider>
  </>
  )
}
export default Home;