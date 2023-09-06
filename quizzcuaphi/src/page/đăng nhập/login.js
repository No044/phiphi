import "./csslogin.css"
import login from "../../img/login.webp"
import banner2 from "../../img/banner2.png"
import { Image,Form, Input, Button,notification,Space, Descriptions,Spin } from "antd"
import { getCookie, setCookie } from "../../helpers/cookie"
import { navigate, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import {MailOutlined,LockOutlined } from '@ant-design/icons'
import { useState } from "react"
function Login(){ 
    const [form] = Form.useForm()
    const dispath = useDispatch()
    const navigate = useNavigate()
    const [api,contexholder] = notification.useNotification()
    const render = useSelector((render) => render.handledata)
    const handlelogin = (e) => {
        console.log(e)
        const email = e.email
        const password = e.password
        // const fetchlogin = async (source) => {
        //     const data = await fetch(source)
        //     const result = await data.json()
        // }
      fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
      .then((data) => {
         return data.json()
      })
      .then((dataa)=> {
        console.log(dataa[0])
        if(dataa.length > 0){
            const {email,fullName,token,id} = dataa[0]
            setCookie("email",email,1)
            setCookie("fullName",fullName,1)
            setCookie("token",token,1)
            setCookie("id",id,1)
            console.log(getCookie("token"))
                
            dispath({
              type : "loading",
              value : true
            })
            api.success({           
              message : `Đăng Nhập Thành Công`,
              placement : "top",
              style:{
                width : "100%",
                background: "white"
            }})
            setTimeout(() => {
              dispath({
                type : "render",
                value : !render
              })
              dispath({
                type : "loading",
                value : false
              })
     
              navigate("/home")
             },2000)    
          }
        else{
            api.error({ 
                 
              style:{
                width : "100%",
                background: "white",
              },
           
              message : `Đăng Nhập Thất Bại`,
              description : "Vui Lòng kiểm tra lại tài khoản và mật khẩu",
              placement : "top"
            })
        }
      })
    }
    const resetForm = ()=>{
      console.log(form)
      form.resetFields()
    }
    
    
  const rules = [
    {
      required: true,
      message: "Vui Lòng Nhập Email!",
    }, ]

      
  const rules1 = [
    {
      required: true,
      message: "Vui Lòng Nhập Mật Khẩu",
    }, ]

    return (
        <> 
      
          {contexholder}
           <div className="formlogin" >
               <div className="image">
               <Image className="img" src={banner2}/>
               </div>
               <Form className="form" onFinish={handlelogin}
                 form={form}
               >
                 
                 <h2 className="member">Member Login</h2>
                   <Form.Item rules = {rules} name="email" >
                   <Input className="email" placeholder="Email"/>
                   </Form.Item>
                   <Form.Item rules={rules1} name="password" >
                   <Input.Password  className="password" placeholder="Mật Khẩu" type="email"/>
                   </Form.Item>
                   <Button className="login" type="primary" htmlType="submit">Login</Button>
                   <Button className="reset" onClick={resetForm}>Reset</Button>        
               </Form>
           </div>
         
         
        </>
    )
}
export default Login