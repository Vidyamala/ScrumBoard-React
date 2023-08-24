import { Link } from "react-router-dom";
function UnAuthenticated() {
   
    return (
        <div style={{ minHeight: "100vh", fontSize: "2rem" ,minWidth:"100vw"}} className="d-flex flex-column justify-content-center align-items-center">
            <div>
                OOPS! Seems you don't have enough permission to access this page
            </div>
            <Link to="/" > To access this page kindly login</Link>
        </div>
    )
}
export default UnAuthenticated;