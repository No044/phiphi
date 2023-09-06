import { useEffect, useState } from "react"
import { getCookie } from "../../helpers/cookie"
import { Button, Table } from "antd"
import { Link, NavLink } from "react-router-dom"
import { DatePicker } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"
import Delete from "./delete";
import doremon from "../../img/history.jpg"
import dayjs from 'dayjs';
import "./csslichsu.css"
import {useSelector} from "react-redux" 
const { RangePicker } = DatePicker;

function History() {
    const renderhistory = useSelector((renderhistory) => renderhistory.handlerender)
    console.log(renderhistory)
    const [data, setdata] = useState([])
    const [title, settile] = useState([])
    const [datedefaul, setdatedefaul] = useState(null);
    const [datadate, setDatadate] = useState({
        datestart: "1/1/1000",
        dateend: "31/12/9999"
    });
    // console.log(datadate.datestart,datadate.dateend)
    const useid = getCookie("id")
    const dateFormat = 'DD-MM-YYYY';
    const dateFormat1 = 'YYYY-MM-DD';
    // const datadate = {
    //     datestart : "ád",
    //     dateend : "31/12/9999"
    // }
    const handelranpicker = (e, b) => {
        let date = [...b]
        let start = date[0].toString().split('/')
        let end = date[1].toString().split('/')
        console.log(start,end)
        let newstart = " "
        let newend = " "
        for(let i = 0 ; i < start.length; i++)
        {
            if(i != 2){
                newstart += start[i] + "-"
                newend += end[i] + "-"
            }
            else{
                newstart += start[i]
                newend += end[i] 
            }
        }
        // draw()
        // console.log(newstart,newend)
        setDatadate({
            datestart: date[0],
            dateend: date[1]
        });
        setdatedefaul([dayjs(newstart, dateFormat), dayjs(newend, dateFormat)])
    }
    const handlereset = () => {
        setDatadate({
            datestart: "1/1/1001",
            dateend: "31/12/9999"
        });
        setdatedefaul(null)
    }

    // const draw = () => {
    //     console.log(`http://localhost:3000/answers?userId=${useid}&date_gte=${datadate.datestart}&date_lte=${datadate.dateend}`)
    //     fetch(`http://localhost:3000/answers?userId=${useid}&date_gte=${datadate.datestart}&date_lte=${datadate.dateend}`)
    //     .then((data)=> {
    //         return data.json()
    //     })
    //     .then((data)=> {
    //         setdata(data)    
    //         console.log(data)     
    //     })
    // }
    useEffect(() => {
        // console.log(`http://localhost:3000/answers?userId=${useid}&date_gte=${datadate.datestart}&date_lte=${datadate.dateend}`)
        fetch(`http://localhost:3000/answers?userId=${useid}`)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                function parseDate(dateString) {
                    const parts = dateString.split('/');
                    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
                }
                const findData = data.filter(item => {
                    return parseDate(item.date) >= parseDate(datadate.datestart) && parseDate(item.date) <= parseDate(datadate.dateend)
                });
                setdata(findData)
                // console.log(data)     
            })
    }, [datadate,renderhistory])

    useEffect(() => {
        fetch(`http://localhost:3000/topics`)
            .then((data) => {
                return (
                    data.json()
                )
            })
            .then((data) => {
                settile(data)
            })
    }, [])



    const render = []
    for (let i = 0; i < data.length; i++) {
        let resulf = title.filter((item) => {

            return (item.id == data[i].topicId)
        })

        render.push(
            {
                name: resulf,
                ...data[i]
            }
        )
    }



    const columns = [
        {
            title: "Số Thứ Tự",
            key: "userId",
            render: function (a, b, c) {
                return (
                    <>{c + 1}</>
                )
            }
        },
        {
            title: "Tên Chủ Đề",
            dataIndex: "name",
            key: "userId",
            render: function (a, b, c) {
                let resulf = a.map((item) => {
                    return item.name

                })

                return (
                    <>
                        {resulf[0]}
                    </>
                )
            }
        },
        {
            title: "Thời Gian",
            key: "datetime",
            render: function (a, b, c) {

                return (
                    <>
                        {b.date} {b.time}
                    </>
                )
            }
        },
        {
            title: "Lịch Sử",
            dataIndex: "id",
            key: "userId",
            render: function (a, b, c) {

                return (
                    <div><Link to={"/resulf/" + b.id}><Button className="buttonlichsu">Xem lại</Button></Link></div>
                )
            }
        },
        {
            title: "Xóa",
            key: "delete",
            render: function (a, b, c) {
                 console.log(b.userId)
                return (
                    <Delete id = {b.id} user = {b.userId}/>            
                )
            }

        },
        {
            title: <div className="lichsutimkiem" ><span className="lichsutitle">Tìm Kiếm</span>
                <div> <RangePicker value={datedefaul}

                    style={{ width: "300px" }} format="DD/MM/YYYY" onChange={handelranpicker} /></div>
                <Button className="buttonreset" onClick={handlereset}>Reset</Button>
            </div>,
            key: "lichsuseach",


        }
    ]

    return (
        <>   
              <Table dataSource={render} columns={columns} rowKey="id" locale={{
        emptyText: <div> <div className="tabletext">Bạn Chưa Có Bất Kì Bài Làm Nào</div> <img src={doremon} /></div>
      
      }}/>
               
        </>
    )
}

export default History