import { NavLink, Link,Outlet } from "react-router-dom"
import "./layout.css"
import Titlee from "./tiêu đề/tittle"
import {Button} from "antd"
import { getCookie } from "../helpers/cookie"
import Logout from "./đăng xuất/logout"
import {useDispatch, useSelector} from "react-redux"
import { Spin } from "antd"
function Layout() {
    const token = getCookie("token")
    const render = useSelector((render) => render.handledata)
    const loading = useSelector((loading) => loading.handleLoading)
    return (
        <>
         <Spin className="loading" size="large" tip="Loading . . ." spinning={loading} >
           {token ? (<>
            <div className="header">
                <div className="Logo">Quizz</div>
                <div className="Menu">
                   <ul>
                     <NavLink className="xoa" to="/home"><li>Trang Chủ</li></NavLink>
                     <NavLink className="xoa" to="/luyende"> <li>Luyện Đề</li></NavLink>
                     <NavLink className="xoa" to="/lichsu" > <li>Lịch Sử</li></NavLink>
                     <Link className="xoa" to="/danhgia"> <li>Đánh Giá</li></Link>
                     <Link className="lienhe" to="lienhe"> <li>Liên Hệ</li></Link>
                   </ul>
                </div>
                <div className="logout">
                     <Logout/>
                </div>
            </div>
            <div className="main">
                 <Outlet/>
            </div>
           </>) : ( <>
            <div className="header">
                <div className="Logo">Quiz</div>
                <div className="login">
                    <NavLink to="login"><Button type="ghost">Đăng Nhập</Button></NavLink>
                    <NavLink to="register"> <Button type="ghost">Đăng Ký</Button></NavLink>
                </div>
            </div>
            <div className="main">
                 <Outlet/>
            </div>
           </>)}
           </Spin>
        </>
        
    )
}
export default Layout