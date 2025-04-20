import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import './index.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../Assests/Images/owl1.jpg";
import image2 from "../../Assests/Images/owl2.jpg";
import image3 from "../../Assests/Images/heron.jpeg";
import image4 from "../../Assests/Images/parrot1.jpg";

import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";


export const Land4 = () => {
    const [inView, setInView] = useState(false);
    const cardContainerRef = useRef(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/activities");
                const data = await response.json();
                if (data.success) {
                    setActivities(data.data);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        fetchActivities();
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                    }
                });
            },
            { threshold: 0.5 } // Trigger animation when 50% is visible
        );

        const section = document.querySelector(".land4-content");
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                }
            },
            { threshold: 0.3 }
        );

        if (cardContainerRef.current) {
            observer.observe(cardContainerRef.current);
        }
        return () => {
            if (cardContainerRef.current) {
                observer.unobserve(cardContainerRef.current);
            }
        };
    }, []);
    const displayedActivities = activities.slice(0, 4);

    return (
        <>
            <div className="land4">
                <div className={`land4-content ${inView ? "animate" : ""}`}>
                    <p>Join Us for Exciting Experiences</p>
                    <h2>Upcoming Events and <br /> Activities</h2>
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

                <div ref={cardContainerRef} className="land4-content-card-container"  style={{marginBottom:"70px"}}>

                {displayedActivities.map((activity, index) => (
                        <div className="grid-item">
                            <div className="grid-item-img">
                                <img src={`http://localhost:8000/${activity.image}`} alt="" />
                            </div>
                            <div className="grid-item-icon">
                                <a href=""><FontAwesomeIcon icon={faLocationArrow} /></a>
                            </div>
                            <div className="grid-item-content">
                                <p>{activity.tag}</p>
                                <h2>{activity.title}</h2>
                            </div>
                        </div>
                    ))}

                 
                </div>
                <div className="award-section" >
                    <div className="award-section-content">
                        <h1><span>400+</span> Winning Awards</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, rem?</p>
                    </div>
                    <div className="button">
                        <Link to="/activities">See More</Link>
                    </div>
                </div>

            </div>

        </>
    );
};


