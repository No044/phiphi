import { DeleteOutlined } from "@ant-design/icons"
import { Button, Modal } from 'antd';
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux" 
function Delete(prop){ 
    const renderhistory = useSelector((renderhistory) => renderhistory.handlerender)
   
    const dispath = useDispatch()
    const {id,user} = prop
    const [open,setopen] = useState(false)
    const click = () => {
        setopen(true)
    }
    const accept = async() => {
        const a = await fetch(`http://localhost:3000/answers/${id}`,{
          method : "DELETE",
        })
        const result = await a.json()
        console.log(result)
        if(result){
         setopen(false)
         dispath({
            type : "renderhistory",
            value : !renderhistory
           })
        }
      }
    return (
        <>
          <DeleteOutlined className="iconlichsu" onClick={click} /> 
          <Modal open={open}  onOk={accept} onCancel={() => setopen(false)}/>
        </>
    )
}
export default Delete