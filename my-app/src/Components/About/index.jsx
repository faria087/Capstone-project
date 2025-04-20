
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Image1 from "../../Assests/Images/img1.png";
import Image2 from "../../Assests/Images/slide2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const About = () => {
    const [inView, setInView] = useState(false);

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

        const aboutSection = document.querySelector(".about");
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => {
            if (aboutSection) {
                observer.unobserve(aboutSection);
            }
        };
    }, []);

    return (
        <div className={`about ${inView ? "animate" : ""}`} >   
            <div className="img-section" style={{marginRight: "50px"}}>
                <div className="bg-img">
                    <img src={Image1} alt="" />
                </div>
                <div className="front-img">
                    <img src={Image2} alt="" />
                </div>
                <div className="img-card">
                    <h2>15 <span><sup>+</sup></span></h2>
                    <p>Experience</p>
                </div>
            </div>
            <div className="content-section">
                <div className="content">
                    <p className="sub-title">Supporting Our Cause Together</p>
                    <h2>Support Our Mission and Make a Difference</h2>
                    <p>Business tailored it design, management & support services business agency elit, sed do eiusmod tempor.</p>
                    <p className="border"></p>
                    <div className="content-list">
                        <div className="list1">
                            <p><FontAwesomeIcon icon={faCheckCircle} /> Giving Hope, Changing Lives</p>
                            <p><FontAwesomeIcon icon={faCheckCircle} /> Together We Can</p>
                            <p><FontAwesomeIcon icon={faCheckCircle} /> Every Act Counts</p>
                        </div>
                        <div className="list2">
                            <p><FontAwesomeIcon icon={faCheckCircle} /> Empower Through Charity</p>
                            <p><FontAwesomeIcon icon={faCheckCircle} /> Healing Communities</p>
                            <p><FontAwesomeIcon icon={faCheckCircle} /> Compassion in Action</p>
                        </div>
                    </div>
                    <div className="user-section">
                        <div className="user-count">
                            <h2>999<sup>+</sup></h2>
                            <p>Active Reviews</p>
                        </div>
                        <div className="users">
                            <img src={Image1} alt="" />
                            <img src={Image2} alt="" />
                            <img src={Image1} alt="" />
                            <img src={Image2} alt="" />
                        </div>
                    </div>
                    <button>More About Us</button>
                </div>
            </div>
        </div>
    );
};
