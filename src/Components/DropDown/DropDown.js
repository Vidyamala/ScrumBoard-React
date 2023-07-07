import "./DropDown.css"
function DropDown({opt,placeholder}){
    return(
        <div >
        <select className="dropbtn">
            <option>--{placeholder}--</option>
{   opt.map((e)=>{
   return <option>{e}</option>
   })}
        </select>
        </div>
    )
}
export default DropDown;