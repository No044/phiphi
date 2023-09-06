import { Button } from "antd";
import { deleteAllCookies } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Logout(){
    const Navigate = useNavigate()
    const dispath = useDispatch()
    const render = useSelector((render) => render.handledata)
    console.log(render)
    const handlelogout = () => {
      
         deleteAllCookies()
        dispath({
          type : "loading",
          value : true
        })
        setTimeout(() => {
          dispath({
            type : "render",
            value : !render
          })         
          dispath({
            type : "loading",
            value : false
          })
          Navigate("/login")
        },2000)
   
    }
    return(
      <>
   
        <Button className="logoutbutton" onClick={handlelogout} type="ghost">Đăng Xuất</Button>
     
      </>
    )
}

export default Logout