import "./cssregister.css"
import login from "../../img/login.webp"
import { Image, Form, Input, Button } from "antd"
import { getCookie, setCookie } from "../../helpers/cookie"
import { navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { generateToken } from "../../helpers/generateToken"
import { Divider, notification,Spin} from 'antd';
import { useState } from "react"

function Register() {
  const [form] = Form.useForm()
  const go = useNavigate()
  const [api, contexholder] = notification.useNotification()
  const dispath = useDispatch()
  const handleregister = (e) => {
    fetch(`http://localhost:3000/users?email=${e.email}`)
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        // console.log(e)
        const checkemail = e.email.slice(e.email.length - 10 , e.email.length)
        // console.log(checkemail)
        // if (e.Name.length < 5) {
        //   api.info({
        //     message: `Tên Quá Ngắn`,
        //     description: "Hãy Nhập Tên Dài Hơn 4 ký Tự",
        //     placement: "top"
        //   })
        // }
        //  if(checkemail != "@gmail.com"){
        //   api.info({
        //     message: `Lỗi Email`,
        //     description: "Vui Lòng Thêm @gmail.com Vào Cuối Email , Không Được Thêm Bất Kì Kí Tự Nào Sau @gmail.com",
        //     placement: "top"
        //   })
        // }
        // else if(e.email.length - 10 < 6){
        //   api.info({
        //     message: `Email Chưa Đặt Chuẩn`,
        //     description: "Vui Lòng Tạo Email Dài Hơn 6 ký tự",
        //     placement: "top"
        //   })
        // }
         if (data.length > 0) {
          api.warning({
            message: `Email Đã Tồn Tại`,
            description: "Vui Lòng Tạo Một Email Mới",
            placement: "top"
          });
        }
        // else if (e.password.length <= 5) {
        //   api.info({
        //     message: `Mật Khẩu Quá Ngắn`,
        //     description: "Vui Lòng Đặc Mật Khẩu Dài hơn 6 kí tự",
        //     placement: "top"
        //   });
        // }

        // else if (e.password != e.enterpassword) {
        //   api.info({
        //     message: `Hai Mật Khẩu Không Trùng Nhau`,
        //     description: "Vui Lòng Kiểm Tra Lại Phần Nhập Mật Khẩu ",
        //     placement: "top"
        //   });
        // }
        else {
          const token = generateToken()
          const data = {
            fullname: e.Name,
            email: e.email,
            password: e.password,
            token: token
          }

          fetch("http://localhost:3000/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)

            })
            .then((data) => {
              if (data) {
                api.success({
                  message: "Tạo Tài Khoản Thành Công",
                  placement: "top"
                });
                     
                dispath({
                  type : "loading",
                  value : true
                })


               setTimeout(()=>{
                dispath({
                  type : "loading",
                  value : false
                })
                go("/login")
              },2000)
              }
            })
        }
      })
  }
 
  
  
  const resetForm = () => {
    console.log(form)
    form.resetFields()
  }
 

  const rules0 = [{
    required: true,
    message: "Vui Lòng Nhập Tên",
  },
  {
    min: 6,
    message: 'Tên phải có ít nhất 6 kí tự!',
  },
  { pattern: /^[\p{Lu}]/u, message: 'Kí tự đầu tiên phải viết hoa!' }

]

  const rules1 = [{
    required: true,
    message: "Vui Lòng Nhập Email",

  },
  {
    min: 6,
    message: 'Email phải có ít nhất 6 kí tự!',
  },
  { pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: 'Email phải kết thúc bằng @gmail.com' },]


  const rules2 = [{
    required: true,
    message: "Vui Lòng Nhập Mật Khẩu",
  },
  {
    min: 6,
    message: 'Mật Khẩu phải có ít nhất 6 kí tự!',
  },
  {
    
  }
]


  const rules3 = [{
    required: true,
    message: "Vui Lòng Nhập Lại Mật Khẩu",
  },
  {
    validator : (_, value) => {
      const password = form.getFieldValue('password'); // Lấy giá trị của trường password
      console.log(value,password)
      if (value && password !== value) {
        return Promise.reject('Mật khẩu không khớp!');
      }
      return Promise.resolve();
    }
  }
 ]
  return (
    <>
     
      {contexholder}
      <div className="formregister" >

        <Form className="form" onFinish={handleregister}
          form={form}
        >
          <h2>Register</h2>
          <Form.Item name="Name" rules={rules0}   >
            <Input placeholder="Tên Đầy Đủ"  />
          </Form.Item>
          <Form.Item name="email" rules={rules1} >
            <Input placeholder="Email"/>
          </Form.Item>
          <Form.Item name="password" rules={rules2} >
            <Input.Password placeholder="Mật Khẩu" className="password" />
          </Form.Item>
          <Form.Item name="enterpassword" rules={rules3}>
            <Input.Password placeholder="Nhập Lại Mật Khẩu" className="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="button1">Đăng Ký</Button>
          <Button onClick={resetForm} className="button2">Reset</Button>
        </Form>
      </div>
    
    </>
  )
}

export default Register