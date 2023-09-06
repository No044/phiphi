import { Children } from "react"
import Layout from "../page/layout"
import Titlee from "../page/tiêu đề/tittle"
import Register from "../page/đăng ký/register"
import Login from "../page/đăng nhập/login"
import { Navigate } from "react-router-dom"
import Home from "../page/trang chủ/home"
import Private from "./private"
import Luyende from "../page/luyện đề/luyende"
import Resulf from "../page/kết quả/resulf"
import Chitietluyende from "../page/luyện đề/chitietluyende"
import History from "../page/lịch sử/lichsu"
export const router = [
{
    path : '/',
    element : <Layout/>,
    children : [
        {
           index : true,
           element : <Titlee/>
        },
        {
            path: "register",
            element : <Register/>
        },
        {
            path: "login",
            element : <Login/>
        },
        {
            element: <Private/>,
            children : [
                {
                    path: "*",
                    element:  <Navigate to = "/home"/>
                    
                },
                {
                    path : "/home", 
                    element: <Home/>
                },
                {
                    path : "/luyende",
                    element: <Luyende/>
                },
                {
                    path : "chitiet/:id",
                    element : <Chitietluyende/>
                },
                {
                    path: "resulf/:id",
                    element : <Resulf/>
                },
                {
                    path: "lichsu",
                    element: <History/>
                }
            ]
        }
    ]
}
]
