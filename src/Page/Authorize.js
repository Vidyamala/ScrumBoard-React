import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { appcontext } from "../App";
import UnAuthenticated from "./UnAthenticated";
import UnAuthorized from "./UnAuthorized";
function Authorize(props){
    var page=useLocation().pathname.slice(1);

    console.log(page)
    var userType=localStorage.getItem("userType");
    console.log(userType,"userType")
    userType=userType.toLowerCase()
    if(!userType) {
        return (<UnAuthenticated />)
    }
    if(userType !=page){
        return (<UnAuthorized />)
    }
    return(<div>
        {props.children}
    </div>)
}
export default Authorize;