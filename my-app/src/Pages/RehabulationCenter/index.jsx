import React, { useState, useEffect, inView } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { Header } from "../../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
//bread-crums image end

import { ImageSlide2 } from "../../Components/imageslide2";
import { Footer } from "../../Components/footer";

// card images
import card1 from "../../Assests/Images/crow.jpg";
import card2 from "../../Assests/Images/eagel3.jpg";

export const RehabulationCenter = () => {
    const [inView, setInView] = useState(false);
    const [centers, setCenters] = useState();

    useEffect (() => {
        const fetchCenters = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/centers");
                const data = await response.json();
                if (data.success) {
                    setCenters(data.data);
                } else {
                    console.error("Failed to fetch centers:", data.message);
                }
            } catch (error) {
                console.error("Error fetching centers:", error);
            }
        };

        fetchCenters();
    }
    , []);


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

        const aboutSection = document.querySelector(".rehabulation-center");
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
        const container = document.querySelector(".rehabulation-center-container");

        const handleMouseEnter = () => {
            const elements = document.querySelectorAll(".rehabulation-card");
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

    return (
        <>
            <div className="rehabulation-page">
                <Header />
                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Rehabulation Center</h1>
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
                            <a href="">Rehabulation Center</a>
                        </div>
                    </div>
                </div>

                <div className="rehabulation-center">
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

                

                    <div className="rehabulation-center-container">
                        {centers && centers.map((center, index) => (
                            <div className="rehabulation-card" key={index}>
                                <div className="rehabulation-card-img">
                                    <img src={`http://localhost:8000/${center.image}`} alt="Rehabilitation Center" />
                                </div>
                                <div className="rehabulation-card-content">
                                    <h3 className="card-title">{center.title}</h3>
                                    <p className="card-subtitle">{center.location}</p>

                                    <div className="border-line"></div>

                                    <div className="info-row">
                                       
                                        <p className="capacity">Capacity: <span>{center.capacity}</span></p>
                                    </div>

                                    <div className="button">
                                        <Link to="/donate">Donate Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <div className="rehabulation-card show">
                            <div className="rehabulation-card-img">
                                <img src={card1} alt="Rehabilitation Center" />
                            </div>
                            <div className="rehabulation-card-content">
                                <h3 className="card-title">Child Trouble & Care</h3>
                                <p className="card-subtitle">Food & Transport</p>

                                <div className="border-line"></div>

                                <div className="info-row">
                                    <span className="tag">Full</span>
                                    <p className="capacity">Capacity: <span>1000</span></p>
                                </div>

                                <div className="button">
                                    <Link to="/donate">Donate Now</Link>
                                </div>
                            </div>
                        </div> */}
                    </div>


                </div>
                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
};