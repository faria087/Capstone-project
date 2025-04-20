import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faMapMarkerAlt,
    faPaperPlane,
    faPhone,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import image from "../../Assests/Images/img1.png";
import image2 from "../../Assests/Images/sprade.png";
import "./index.css";

export const Contact = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const nameChangeHandeler = (e) => {
        setName(e.target.value);
    }
    const emailChangeHandeler = (e) => {
        setEmail(e.target.value);
    }
    const phoneChangeHandeler = (e) => {
        setPhone(e.target.value);
    }
    const massageChangehandeler = (e) => {
        setMessage(e.target.value);
    }

    const submitHandeler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);

        await axios.post('http://localhost:8000/api/contacts', formData)
            .then((response) => {
                if (response?.data?.success) {
                    navigate("/")
                }
            })
    }




    return (
        <>
            <div className="contact">
                <div className="contact-img">
                    <img src={image} alt="" />
                </div>

                <div className="conatact-content">
                    <p>Get In Touch</p>
                    <h1>
                        Send Us message For <br /> Donation!
                    </h1>

                    <form action="" onSubmit={submitHandeler}>
                        <div className="section-1">
                            <div className="section-item">
                                <input type="text" placeholder="Your Name" value={name} onChange={nameChangeHandeler} />
                                <span>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </span>
                            </div>
                            <div className="section-item">
                                <input type="email" placeholder="Your Mail" value={email} onChange={emailChangeHandeler} />
                                <span>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </span>
                            </div>
                        </div>
                        <div className="section-item2" >

                            <input type="number" placeholder="Your Phone" value={phone} onChange={phoneChangeHandeler} />
                            <span>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>

                            {/* <div className="section-item">
                                <input type="text" placeholder="Your Address" />
                                <span>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </span>
                            </div> */}
                        </div>
                        <div className="section-item2">
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                rows="5"
                                placeholder="Your Message" value={message} onChange={massageChangehandeler}
                            ></textarea>
                            <span style={{ marginBottom: "90px" }}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>
                        <div
                            className="button"
                            style={{ marginTop: "40px", width: "100%", height: "70px" }}
                        >
                            <button style={{ textAlign: "center", marginLeft: "270px" }}>
                                Send A Message
                            </button>
                        </div>
                    </form>
                </div>
                <div className="contact-img2">
                    <img src={image2} alt="" />
                </div>
            </div>
        </>
    );
};
