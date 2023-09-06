import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Badge, Button, Modal, Radio, Space } from "antd"
import { CloseCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Pie, Liquid } from '@ant-design/plots';
import "./cssresulf.css"
import Column from "antd/es/table/Column";
function Resulf() {
    const [data, setdata] = useState([])
    const [datadefault, setdatadefault] = useState([])
    const [datatitle, setdatatitle] = useState([])
    const param = useParams()
    const [idtopic, setid] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(true);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

   
    useEffect(() => {
        fetch(`http://localhost:3000/answers/${param.id}`)
            .then((data) => {
                return (
                    data.json()
                )
            })
            .then((data) => {
                setdata(data.answers)
                setid(data.topicId)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/questions?topicId=${idtopic}`)
            .then((data) => {
                return (
                    data.json()
                )
            })
            .then((data) => {
                //    console.log(data)
                setdatadefault(data)
            })
    }, [idtopic])

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3000/topics?id=${idtopic}`)
                .then((data) => {
                    return (
                        data.json()
                    )
                })
                .then((data) => {
                    //    console.log(data)
                    setdatatitle(data)
                })
        }, 1000);
    }, [idtopic])
    // console.log(datadefault)

    const render = []
    for (let i = 0; i < data.length; i++) {
        render.push(
            {
                ...datadefault[i],
                answersuser: data[i].answers,

            }
        )
    }
    let count = 0
    for (let i = 0; i < render.length; i++) {
        if (render[i].answersuser == render[i].correctAnswer) {
            count++
        }
    }

    const diem = (count / (render.length / 100)).toFixed(0)

    console.log(count)



    const config1 = {
        percent: diem * 0.01,
        outline: {
            border: 1.5,
            distance: 4,
        },
        wave: {
            length: 128,

        },
        color: "#1AAFD1",
      

    };
    const dapan = ["A", "B", "C", "D", "E", "F", "G", "H"]
    return (
        <>
            {datatitle.length != 0 ? (<>
                <h2 className="tittlechitiet">Đề : {datatitle[0].name}</h2>

                {render.map((item, index) => {
                    let checkgobal = false
                    if (item.correctAnswer == item.answersuser) {
                        checkgobal = true
                    }

                    return (
                        <div key={index} className="formresulf">
                            <Space>
                                <Badge.Ribbon text={checkgobal ? ("Đúng") : ("Sai")} color={checkgobal ? ("green") : ("red")}>
                                    <div className="tittleresulf">Câu {index + 1} : {item.question} </div> </Badge.Ribbon>
                            </Space>
                            <br />
                            <Radio.Group className="radiogroup" disabled >
                                <Space direction="vertical">
                                    {item.answers.map((itemm, index) => {

                                        return (
                                            <div key={index}>
                                                <span className="dapann">{dapan[index]}.</span>

                                                {item.correctAnswer != index && index != item.answersuser ?
                                                    (<><Radio value={index}>{itemm}</Radio></>)
                                                    :
                                                    (item.correctAnswer == index && index == item.answersuser ? (<><Radio value={index}>{itemm}<CheckOutlined className="dung" /></Radio></>) :
                                                        (<><Radio value={index}>{itemm} {item.correctAnswer == index && <CheckOutlined className="dung" />}  {item.answersuser == index && <CloseOutlined className="sai" />}</Radio></>))
                                                }
                                            </div>

                                        )
                                    })}
                                </Space>
                            </Radio.Group>
                        </div>                        
                    )

                })

                }
                
              <div className="buttonresulf">  <Button className="button" onClick={showModal}>Xem Kết Quả</Button> <Link to="/luyende"> <Button className="button">Quay Lại</Button></Link></div>

                <Modal title="Kết Quả" className="modalmap" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                    <Space style={{ marginLeft: "40px", flexDirection: "column", alignItems: "center" }} >
                        <div className="title">
                            <div className="titlemap"> <h3 className="tittlepie"> Số Điểm : </h3> <span className="titlediem"> {diem}/100</span></div>
                            <div className="titlemap"> <h3 className="tittlepie"> Số Câu Đúng : </h3> <span className="titlediem"> {count}/{render.length}</span></div>
                        </div>
                        <Liquid {...config1} className="liquid" />
                    </Space>

                </Modal>
                

            </>) :
                (<> đang load dữ liệu</>)}

        </>
    )
}
export default Resulf