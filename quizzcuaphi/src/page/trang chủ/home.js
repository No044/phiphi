import { Badge, Carousel, Image, Modal, Space } from "antd"
import { Link, NavLink } from "react-router-dom"
import { CheckOutlined } from '@ant-design/icons';
import Icon, { HomeOutlined } from '@ant-design/icons';
import "./csshome.css"
import green from "../../img/green.png"
import laptop from "../../img/laptop.png"
import laptop2 from "../../img/laptop2.png"
import banner from "../../img/banner.gif"
import { useEffect, useState } from "react"
import { getCookie } from "../../helpers/cookie";
function Home() {
    const [a, seta] = useState(true)
    const [fullName, setfullname] = useState("")
    setTimeout(() => {
        seta(false)
    }, 15000);
    const token = getCookie("token")
    console.log(token)
    useEffect(() => {
        fetch(`http://localhost:3000/users?token=${token}`)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setfullname(data[0].fullname)
            })
    })
    console.log(fullName)
    const PandaSvg = () => (
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path
                d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
                fill="#6B676E"
            />
            <path
                d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
                fill="#FFEBD2"
            />
            <path
                d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
                fill="#E9D7C3"
            />
            <path
                d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
                fill="#FFFFFF"
            />
            <path
                d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
                fill="#6B676E"
            />
            <path
                d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
                fill="#464655"
            />
            <path
                d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
                fill="#464655"
            />
            <path
                d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
                fill="#464655"
            />
        </svg>

    );
    const PandaIcon = (props) => <Icon component={PandaSvg} {...props} />;
    const handlecancel =() => {
        seta(false)
    }
    const handleok = () => {
        seta(false)
    }
    return (
        <>
            <Modal open={a} className="modal" onCancel={handlecancel} onOk={handleok}>
                <Space>
                    <Badge.Ribbon className="badge" text={"Hello " + fullName}>
                        <PandaIcon className="icon" />
                    </Badge.Ribbon>
                </Space>

                <div className="content">Chào Mừng Bạn đến với Website trắc nghiệm online đây là một nền tảng trực tuyến cho phép
                    các sinh viên thực hiện các bài kiểm tra, trắc nghiệm,
                    đánh giá và đo đạc kiến thức của mình trong lĩnh vực học tập
                    . Nếu bạn gặp vấn đề hay thắc mắc vui lòng sang trang liên hệ</div>

            </Modal >
            <Carousel autoplay className="slide" effect="fade">
                <div>
                    <div className="box box1">
                        <div className="boxchildren1">

                            <h2>Developer Company</h2>
                            <p>Frontend website online  <br /> test application<br />for student</p>
                            <NavLink to="/luyende"> <button className="bt bt1">Apply Now</button></NavLink>
                            <NavLink to="/lichsu"> <button className="bt bt2">View More</button></NavLink>
                        </div>

                        <div className="boxchildren2">
                            <Image src={banner} />
                        </div>
                    </div>

                </div>
                <div>
                    <div className="box box2">
                        <div className="boxchildren1">

                            <h2>Modern Technology</h2>
                            <p>New Genneration of <br /> Technology and<br />Design</p>
                            <NavLink to="/luyende"> <button className="bt bt1">Apply Now</button></NavLink>
                            <NavLink to="/lichsu"> <button className="bt bt2">View More</button></NavLink>
                        </div>

                        <div className="boxchildren2">
                            <Image src={green} />
                        </div>
                    </div>
                </div>

                <div>

                    <div className="box box3">
                        <div className="boxchildren1">

                            <h2>Latest Products</h2>
                            <p>The New Era Of <br /> App Design And <br /> Tech</p>
                            <NavLink to="/luyende"> <button className="bt bt1">Apply Now</button></NavLink>
                            <NavLink to="/lichsu"> <button className="bt bt2">View More</button></NavLink>
                        </div>

                        <div className="boxchildren2">
                            <Image src={laptop} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="box box4">
                        <div className="boxchildren1">

                            <h2>Fresh New Items</h2>
                            <p>A New Era Of Our <br /> Digitial Business<br />Platform</p>
                            <NavLink to="/luyende"> <button className="bt bt1">Apply Now</button></NavLink>
                            <NavLink to="/lichsu"> <button className="bt bt2">View More</button></NavLink>
                        </div>

                        <div className="boxchildren2">
                            <Image src={laptop2} />
                        </div>
                    </div>
                </div>
            </Carousel>
        </>
    )
}
export default Home