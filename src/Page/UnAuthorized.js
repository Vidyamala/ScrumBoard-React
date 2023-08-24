import { useLocation } from "react-router-dom";
function UnAuthorized(){
    const logout=()=>{
        localStorage.clear();
        window.location.href="/";
    }
    const userType=localStorage.getItem("userType");
    var page=useLocation().pathname.slice(1);
return(
    <div style={{ minHeight: "100vh", fontSize: "2rem" ,minWidth:"100vw"}} className="d-flex flex-column justify-content-center align-items-center">
            <div>
                OOPS! User of {userType} will not be able to access this page
            </div>
            <div onClick={logout} > To access this page kindly login as {page}</div>
        </div>
)
}
export default UnAuthorized;