import { Button, Form, Input, Table } from "antd"
import { useEffect, useRef, useState } from "react"
import { render } from "react-dom"
import { SearchOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Chitietluyende from "./chitietluyende"
import "./cssluyende.css"
function Luyende() {
  const [a, seta] = useState([])
  const [c, setc] = useState([])
  const [datdaefaul,setdatadefaul] = useState('')
  const dataa = useRef(null)
  const param = {
    seach: " "
  }
  const draw = () => {
    fetch(`http://localhost:3000/topics?q=${param.seach}`)
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        seta(data)
      })
  }
  useEffect(() => {
    draw()
  }, [])


  const handleseach = (e) => {
    param.seach = e.target.value
    draw()
    setdatadefaul(e.target.value)
    if (e.target.value.length > 0){
      let timkiem = a.filter((item) => {
        return item.name.includes(e.target.value)
      })
      setc(timkiem)
    }
    else {
      setc([])
    }
  }

  const handledata = (e) => {
    setdatadefaul(e.target.value)
    param.seach = e.target.value
    draw()
    setc([])
  }


const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Tên Topic",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Link Làm bài",
    dataIndex: "id",
    key: "link",
    render: function (a, b, c) {
      let idd = b.id

      return (
        <>

          <Link to={"/chitiet/" + idd}>
            <Button className="buttonluyende">Luyện Đề</Button>
          </Link>

        </>
      )
    }
  },
  {
    title: <div className="seacch">
     <div className="display">  <Input ref={dataa} value={datdaefaul} style={{ width: "200px" }} onChange={handleseach} placeholder="Tìm Kiếm Tài Liệu"/><SearchOutlined className="icon"/></div>
     {
        c.length > 0 && <div className="noihienthi">
          {c.map((item, index) => {
            
            return (
              <Input className="khung" onClick={handledata}  key={index} value={item.name} />
              
            )
          })}
        </div>
      }
    </div>

  },
]
 
return (
  <>
    {a && <Table dataSource={a} columns={columns} rowKey="id" />}
   
  </>
)
}

export default Luyende