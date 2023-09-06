import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Radio, Space, Button, notification } from "antd"
import { getCookie } from "../../helpers/cookie"
import { useForm } from "antd/es/form/Form"
import "./csschitiet.css"
function Chitietluyende() {
    const param = useParams()
    const [date, setdate] = useState(new Date())
    const [data, setdata] = useState([])
    const [title, settitle] = useState([])
    const navigate = useNavigate()
    const [form] = useForm()
    const [api, contexholder] = notification.useNotification()
    useEffect(() => {
        fetch(`http://localhost:3000/questions?topicId=${param.id}`)
            .then((data) => {
                return data.json()
            })
            .then((resulf) => {
                setdata(resulf)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/topics?id=${param.id}`)
            .then((data) => {
                return data.json()
            })
            .then((resulf) => {
                settitle(resulf)
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setdate(new Date())
        }, 1000)
      
        return () => clearInterval(interval);  
    })
    console.log(date)
   
    const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };

    const formatteddate = date.toLocaleString('vi-VN', optionsDate);
    const formattedTime = date.toLocaleTimeString('vi-VN', optionsTime);

    
    const handledata = (e) => {
        const listdata = Object.keys(e).map((item) => {
            return (
                {
                    questionId: item,
                    answers: e[item]
                }
            )
        })
        const standarddata = {
            userId: parseInt(getCookie("id")),
            topicId: param.id,
            answers: listdata,
            date: formatteddate,
            time : formattedTime
        }
        fetch("http://localhost:3000/answers", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(standarddata),
        })
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                const link = "/resulf/" + data.id
                navigate(`${link}`)
            })

    }
    const rules = [{
        required: true,
        message: 'Vui lòng chọn một đáp án',
    }]

   

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                handledata(values);
            })
            .catch(() => {
                api.warning({
                    message: `Nộp Bài Thất Bại`,
                    description: "Vui Lòng Nhập Đủ Tất Cả Đáp Án",
                    placement: "top",
                    className: 'custom-notification',


                })



            });
    };


   

    const dapan = ["A", "B", "C", "D", "E", "F", "G", "H"]
    return (
        <>
            {contexholder}
            {title.length > 0 ? (<h2 className="tittlechitiet"> Đề : {title[0].name} </h2>) : (<>đang load dữ liệu</>)}

            {data.length > 0 ? (<>
                <Form layout="vertical" onFinish={handledata} form={form} className="formchitiet">
                    {data.map((item, index) => {
                        return (
                            <div key={index}>
                                <>
                                    <Form.Item rules={rules} name={parseInt(index + 1)} label={"Câu " + parseInt(index + 1) + " : " + item.question} >
                                        <Radio.Group className="radiogroup" >
                                            <Space direction="vertical">
                                                {item.answers.map((item, index) => {
                                                    return (
                                                        <div key={index} className="cha">
                                                            <span className="dapan">{dapan[index]}.</span>
                                                            <Radio value={index}>{item}</Radio>

                                                        </div>
                                                    )
                                                })}
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>

                                </>
                            </div>
                        )
                    })}
                    <Button type="primary" className="button" onClick={handleSubmit}>Nộp Bài</Button>
                </Form>
            </>) : (<> </>)}

        </>

    )
}
export default Chitietluyende


