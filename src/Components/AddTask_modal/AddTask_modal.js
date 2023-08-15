import { useEffect, useRef, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddTask_modal.css";
import { getProject } from "../../API/GetProject";
import { getPhase } from "../../API/Getphase";
import { getSprint } from "../../API/Getsprint";
import { getCategory } from "../../API/GetCategory";
import { createTask } from "../../API/CreateTask";
import { appcontext } from "../../App";
function AddTaskModal({ setShowAddTaskModal, showAddTaskModal, title }) {
  const [pro, setPro] = useState([]);
  const [phases, setPhases] = useState([]);
  const [spi, setSprint] = useState([]);
  const [categ, setCategories] = useState([]);
  const [proSprint, setProSprint] = useState();
  const [phaseSprint, setPhaseSprint] = useState();
  const taskname = useRef(null);
  const createdby = useRef(null);
  const project = useRef(null);
  const sprint = useRef(null);
  const phase = useRef(null);
  const category = useRef(null);
  const status = useRef(null);
  const acceptancecriteria = useRef(null);
  const assignee = useRef(null);
  const estimatedEffort = useRef(null);
  const initialfocus = {
    taskname: false,
    createdBy: false,
    project: false,
    sprint: false,
    phase: false,
    category: false,
    status: false,
    acceptanceCriteria: false,
    assignee: false,
    estimatedEffort: false,
    priority: false,
  };
  const { setLoggedUser, loggedUser } = useContext(appcontext);
  const [isfocused, setIsfocused] = useState(initialfocus);
  console.log("hello");
  useEffect(() => {
    let getPro = async () => {
      let res = await getProject();
      console.log(res.project, "res");
      setPro(res.project);
    };
    getPro();
    let getCateg = async () => {
      let res = await getCategory();
      //   console.log(res, "categres");
      setCategories(res);
    };
    getCateg();
  }, []);
  const handleFocus = (e) => {
    // console.log("clicked",e.target.id)
    let id = e.target.id;
    let name = e.target.name;
    if (name === "taskname" || id === "taskname") {
      taskname.current.click();
      setIsfocused({ ...initialfocus, taskname: true });
    } else if (name === "createdBy" || id === "createdBy") {
      createdby.current.focus();
      setIsfocused({ ...initialfocus, createdBy: true });
    } else if (name === "project" || id === "project") {
      project.current.focus();
      setIsfocused({ ...initialfocus, project: true });
    } else if (name === "phase" || id === "phase") {
      phase.current.focus();
      setIsfocused({ ...initialfocus, phase: true });
    } else if (name === "sprint" || id === "sprint") {
      sprint.current.focus();
      setIsfocused({ ...initialfocus, sprint: true });
    } else if (name === "category" || id === "category") {
      category.current.focus();
      setIsfocused({ ...initialfocus, category: true });
    } else if (name === "status" || id === "status") {
      status.current.focus();
      setIsfocused({ ...initialfocus, status: true });
    } else if (name === "acceptanceCriteria" || id === "acceptanceCriteria") {
      acceptancecriteria.current.focus();
      setIsfocused({ ...initialfocus, acceptanceCriteria: true });
    } else if (name === "assignee" || id === "assignee") {
      assignee.current.focus();
      setIsfocused({ ...initialfocus, assignee: true });
    } else if (name === "priority" || id === "priority") {
      assignee.current.focus();
      setIsfocused({ ...initialfocus, priority: true });
    } else if (name === "estimatedEffort" || id === "estimatedEffort") {
      estimatedEffort.current.focus();
      setIsfocused({ ...initialfocus, estimatedEffort: true });
    }
  };
  const initialvalue = {
    taskname: "",
    createdBy: loggedUser?.userId || "Vidyamala S",
    project: "",
    sprint: "",
    phase: "",
    category: "",
    status: "",
    acceptanceCriteria: "",
    assignee: "",
    estimatedEffort: "",
    priority: "",
  };
  const [inputvalue, setInputvalue] = useState(initialvalue);
  const handleHide = () => {
    setIsCreateTaskClicked(false);
    setShowAddTaskModal(false);
    setIsfocused(initialfocus);
    setInputvalue(initialvalue);
  };
  const handleInputChange = (e) => {
    console.log(e.target.value);
    let name = e.target.name;
    if (name === "taskname") {
      setInputvalue({ ...inputvalue, taskname: e.target.value });
    } else if (name === "createdBy") {
      setInputvalue({ ...inputvalue, createdBy: e.target.value });
    } else if (name === "project") {
      let Project = e.target.value;
      setProSprint(Project);
      let getPha = async () => {
        let res = await getPhase(Project);
        console.log(res, "Phaseres");
        setPhases(res);
      };
      getPha();

      setInputvalue({ ...inputvalue, project: e.target.value });
    } else if (name === "phase") {
      setPhaseSprint(e.target.value);
      let getSpi = async () => {
        let res = await getSprint(proSprint, e.target.value);
        console.log(res, "spieres");
        setSprint(res);
      };
      getSpi();
      setInputvalue({ ...inputvalue, phase: e.target.value });
    } else if (name === "sprint") {
      setInputvalue({ ...inputvalue, sprint: e.target.value });
    } else if (name === "category") {
      setInputvalue({ ...inputvalue, category: e.target.value });
    } else if (name === "status") {
      setInputvalue({ ...inputvalue, status: e.target.value });
    } else if (name === "acceptanceCriteria") {
      setInputvalue({ ...inputvalue, acceptanceCriteria: e.target.value });
    } else if (name === "assignee") {
      setInputvalue({ ...inputvalue, assignee: e.target.value });
    } else if (name === "priority") {
      setInputvalue({ ...inputvalue, priority: e.target.value });
    } else if (name === "estimatedEffort") {
      setInputvalue({ ...inputvalue, estimatedEffort: e.target.value });
    }
  };
  const [isCreateTaskClicked, setIsCreateTaskClicked] = useState(false);
  const [errormsg, setErrorMsg] = useState("");
  const handlecreatetask = async () => {
    console.log(inputvalue, "initialres");
    console.log("clicked");
    setIsfocused(initialfocus);
    setIsCreateTaskClicked(true);
    for (const obj in inputvalue) {
      if (!inputvalue[obj]) {
        setErrorMsg("Field is empty");
        return;
      }
    }
    if (errormsg) {
      return;
    } else {
      await createTask(inputvalue);
      console.log("Call APi");
    }
  };
  useEffect(() => {
    console.log(inputvalue);
  }, [inputvalue]);
  return (
    <Modal
      size="lg"
      show={showAddTaskModal}
      onHide={handleHide}
      backdrop="static"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalbody">
        <div className="formlab" name="taskname">
          <label
            id="taskname"
            onClick={handleFocus}
            className={
              isfocused.taskname || inputvalue.taskname
                ? "formlab active text-primary"
                : !inputvalue.taskname && isCreateTaskClicked
                ? "formlab text-danger"
                : "formlab"
            }
          >
            Task Name:
          </label>
          <input
            ref={taskname}
            onClick={() => {
              console.log("it clicked");
            }}
            onFocus={handleFocus}
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.taskname}
            name="taskname"
            id={isfocused.taskname ? "inputactive" : ""}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="formlab">
          <label
            style={{ cursor: "not-allowed" }}
            id="createdBy"
            onClick={handleFocus}
            className={
              (isfocused.createdBy || inputvalue.createdBy) &&
              !isCreateTaskClicked
                ? "formlab active text-primary"
                : inputvalue.createdBy && !isCreateTaskClicked
                ? "formlab active text-primary"
                : inputvalue.createdBy && isCreateTaskClicked
                ? "formlab active text-primary"
                : isCreateTaskClicked && isfocused.createdBy
                ? "formlab active text-primary"
                : isCreateTaskClicked && !inputvalue.createdBy
                ? "formlab text-danger"
                : "formlab"
            }
          >
            Created By:
          </label>
          {/* <input name="createdBy" onChange={(e)=>handleInputChange(e)} value={inputvalue.createdBy} onFocus={handleFocus} id={isfocused.createdBy ? "inputactive" : ""} className="form-control" type='text'></input> */}
          <input
            ref={createdby}
            name="createdBy"
            style={{ cursor: "not-allowed", caretColor: "transparent" }}
            value={inputvalue.createdBy}
            onFocus={handleFocus}
            id={isfocused.createdBy ? "inputactive" : ""}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="">
          <label
            id="project"
            onClick={handleFocus}
            className={
              inputvalue.project
                ? "  text-primary "
                : isCreateTaskClicked && !inputvalue.project
                ? "   text-danger"
                : isfocused.project && !isCreateTaskClicked
                ? "  text-primary dropdn"
                : " "
            }
          >
            Project:
          </label>
          <select
            ref={project}
            name="project"
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.project}
            onFocus={handleFocus}
            className="w-100"
          >
            <option>default</option>
            {pro.length != 0 &&
              pro.map((Pro, index) => {
                return <option key={index}>{Pro}</option>;
              })}
          </select>
        </div>
        <div className="">
          <label
            id="phase"
            onClick={handleFocus}
            className={
              inputvalue.phase
                ? "  text-primary "
                : isCreateTaskClicked && !inputvalue.phase
                ? "   text-danger"
                : isfocused.phase && !isCreateTaskClicked
                ? "  text-primary dropdn"
                : " "
            }
          >
            Phase:
          </label>
          <select
            ref={phase}
            name="phase"
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.phase}
            onFocus={handleFocus}
            className="w-100"
          >
            <option>default</option>
            {phases.length != 0 &&
              phases.map((pha, index) => {
                return <option key={index}>{pha}</option>;
              })}
          </select>
        </div>
        <div className="">
          <label
            id="sprint"
            onClick={handleFocus}
            className={
              inputvalue.sprint
                ? "  text-primary "
                : isCreateTaskClicked && !inputvalue.sprint
                ? "   text-danger"
                : isfocused.sprint && !isCreateTaskClicked
                ? "  text-primary dropdn"
                : " "
            }
          >
            Sprint:
          </label>
          <select
            ref={sprint}
            name="sprint"
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.sprint}
            onFocus={handleFocus}
            className="w-100"
          >
            <option>default</option>
            {spi.length != 0 &&
              spi.map((Sprint, index) => {
                return <option key={index}>{Sprint}</option>;
              })}
          </select>
        </div>
        <div className="">
          <label
            id="category"
            onClick={handleFocus}
            className={
              inputvalue.category
                ? "  text-primary "
                : isCreateTaskClicked && !inputvalue.category
                ? "   text-danger"
                : isfocused.category && !isCreateTaskClicked
                ? "  text-primary dropdn"
                : " "
            }
          >
            Category:
          </label>
          <select
            ref={category}
            name="category"
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.category}
            onFocus={handleFocus}
            className="w-100"
          >
            <option>--Category--</option>
            {categ.length != 0 &&
              categ.map((Categ, index) => {
                return <option key={index}>{Categ}</option>;
              })}
          </select>
        </div>
        <div className="">
          <label
            id="status"
            onClick={handleFocus}
            className={
              inputvalue.status
                ? "  text-primary "
                : isCreateTaskClicked && !inputvalue.status
                ? "   text-danger"
                : isfocused.status && !isCreateTaskClicked
                ? "  text-primary dropdn"
                : " "
            }
          >
            Status:
          </label>
          <select
            ref={status}
            name="status"
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.status}
            onFocus={handleFocus}
            className="w-100"
          >
            <option></option>
            <option value="todo">To Do</option>
            <option value="inprogress">InProgress</option>
            <option value="blocked">Blocked</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="">
          <label
            id="priority"
            onClick={handleFocus}
            className={
              inputvalue.priority
                ? "  text-primary "
                : isCreateTaskClicked && !inputvalue.priority
                ? "   text-danger"
                : isfocused.priority && !isCreateTaskClicked
                ? "  text-primary dropdn"
                : " "
            }
          >
            Priority:
          </label>
          <select
            name="priority"
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.priority}
            onFocus={handleFocus}
            className="w-100"
          >
            <option></option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="formlab">
          <label
            id="acceptanceCriteria"
            onClick={handleFocus}
            className={
              isfocused.acceptanceCriteria || inputvalue.acceptanceCriteria
                ? "formlab active text-primary"
                : !inputvalue.acceptanceCriteria && isCreateTaskClicked
                ? "formlab text-danger"
                : "formlab"
            }
          >
            Acceptance Criteria:
          </label>
          <input
            ref={acceptancecriteria}
            name="acceptanceCriteria"
            onChange={(e) => handleInputChange(e)}
            value={inputvalue.acceptanceCriteria}
            onFocus={handleFocus}
            id={isfocused.acceptanceCriteria ? "inputactive" : ""}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="formlab">
          <label
            style={{ cursor: "auto" }}
            id="assignee"
            onClick={handleFocus}
            className={
              isfocused.assignee || inputvalue.assignee
                ? "formlab active text-primary"
                : !inputvalue.assignee && isCreateTaskClicked
                ? "formlab text-danger"
                : "formlab"
            }
          >
            Assignee:
          </label>
          <input
            ref={assignee}
            name="assignee"
            value={inputvalue.assignee}
            onChange={(e) => handleInputChange(e)}
            onFocus={handleFocus}
            id={isfocused.assignee ? "inputactive" : ""}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="formlab">
          <label
            style={{ cursor: "auto" }}
            id="estimatedEffort"
            onClick={handleFocus}
            className={
              isfocused.estimatedEffort || inputvalue.estimatedEffort
                ? "formlab active text-primary"
                : !inputvalue.estimatedEffort && isCreateTaskClicked
                ? "formlab text-danger"
                : "formlab"
            }
          >
            Estimated Effort:
          </label>
          <input
            ref={estimatedEffort}
            name="estimatedEffort"
            value={inputvalue.estimatedEffort}
            onChange={(e) => handleInputChange(e)}
            onFocus={handleFocus}
            id={isfocused.estimatedEffort ? "inputactive" : ""}
            className="form-control"
            type="text"
          ></input>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleHide} className="btn btn-secondary">
          Close
        </button>
        <button onClick={handlecreatetask} className="btn btn-primary">
          Create Task
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddTaskModal;
