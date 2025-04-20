import React, { inView, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";


import './index.css';
import { Header } from '../../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

// components
import { Land1 } from '../../Components/land1';
import { ImageSlide2 } from '../../Components/imageslide2';
import { Footer } from '../../Components/footer';

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
//bread-crums image end


// card images
import card1 from "../../Assests/Images/crow.jpg";
import card2 from "../../Assests/Images/eagel1.jpg";
import card3 from "../../Assests/Images/owl1.jpg";

export const AidPage = () => {
    const [inView, setInView] = useState(false);

    const [aids, setAids] = React.useState([]);
    const [showAll, setShowAll] = React.useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                    } else {
                        setInView(false);
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is in view
            }
        );

        const aboutSection = document.querySelector(".aids");
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => {
            if (aboutSection) {
                observer.unobserve(aboutSection);
            }
        };
    }, []);

    useEffect(() => {
        const container = document.querySelector(".aids-card-container");

        const handleMouseEnter = () => {
            const elements = document.querySelectorAll(".aid-card");
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("show");
                }, index * 200); // Adds staggered animation
            });
        };

        container.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);



    React.useEffect(() => {
        const callApi = async () => {
            const response = await axios.get("http://localhost:8000/api/aids");
            if (response?.data?.success) {
                setAids(response?.data?.data);
            }
        };
        callApi();
    }, []);


    const getStatusBackgroundColor = (status) => {
        switch (status) {
            case 'pending':
                return 'blue';  // Blue for pending
            case 'accepted':
                return 'green'; // Green for accepted
            case 'denied':
                return 'red';   // Red for denied
            default:
                return 'white'; // Default color
        }
    };

    const handleSeeMore = () => {
        setShowAll(!showAll); // Toggle the showAll state
    };

    return (
        <div className="affected-area-page">
            <Header />
            <div className="breadcrums">
                <div className="breadcrums-imgbx">
                    <img src={image} alt="" />
                </div>
                <div className="breadcrums-content">
                    <h1>Aids</h1>
                </div>

                <div className="breadcrums-front-img">
                    <img src={image2} alt="" />
                </div>

                <div className="stiker">
                    <img src={image3} alt="" />
                </div>

                <div className="bread-crums-main-content">
                    <div className="sub-content">
                        <a href="">Home</a>
                        <span>/</span>
                        <a href="">Aids</a>
                    </div>
                </div>
            </div>
            <div >
                <div className="aids">
                    <div className={`land1-content ${inView ? "animate" : ""}`}>
                        <p>Supporting Our Cause Together</p>
                        <h2>Support Our Mission and <br /> Make a Difference</h2>
                        <div className="icon">
                            <div className="icon-thumb">
                                <span></span>
                                <span></span>
                            </div>
                            <FontAwesomeIcon icon={faHandHoldingUsd} />
                            <div className="icon-thumb">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <div className="aids-card-container">
                        {(showAll ? aids : aids.slice(0, 5)).map((aid, index) => (
                            <div className="aid-card" key={index}>
                                <img src={`http://localhost:8000/${aid.landingcard?.image}`} alt="crow" />
                                <div className="aid-card-content">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h3 style={{ backgroundColor: getStatusBackgroundColor(aid.status), textAlign: "center" }}>{aid.status}</h3>
                                        <Link to={`/donate/${aid.id}`} style={{ background: "Orange", padding: "10px", borderRadius: "20px" }}>
                                            Donate Now
                                        </Link>
                                    </div>
                                    <p>{aid.landingcard?.title || 'N/A'}</p>
                                    <div className="p-content">
                                        {aid.landingcard?.description || 'N/A'}

                                        <p>Person Qty: {aid.qty}</p>
                                    </div>
                                    <div className="content-user">

                                        <div className="user-img">
                                            <img src={`http://localhost:8000/${user?.image}` || card1} alt="" />
                                        </div>
                                        <div className="content-user-information">

                                            <div className="user-name">{user?.name}</div>
                                            <div className="time">{moment(aid?.created_at).fromNow()}</div>
                                        </div>

                                        <div className="aid-item">
                                            <span>{aid.aid}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                    <div className="button" style={{ width: "200px", margin: "0 auto" }}>
                        <button style={{
                            textAlign: "center",
                            marginLeft: "50px"
                        }}>View All</button>
                    </div>
                </div>
                <ImageSlide2 />
                <Footer />
            </div>
        </div>
    );
};

