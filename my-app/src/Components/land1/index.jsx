
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import "./index.css";
import image1 from "../../Assests/Images/owl1.jpg";
import image2 from "../../Assests/Images/parrot1.jpg";
import image3 from "../../Assests/Images/heron.jpeg";
import sprade from "../../Assests/Images/sprade-light.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export const Land1 = () => {
    const { id } = useParams();
    const [inView, setInView] = useState(false);
    const cardContainerRef = useRef(null);
    const [affectedares, setAffectedAreas] = React.useState([]);
    const [showAll, setShowAll] = React.useState(false);


    
    React.useEffect(() => {
        const callApi = async () => {
            const response = await axios.get("http://localhost:8000/api/landingcards");
            if (response?.data?.success) {
                setAffectedAreas(response?.data?.data);
            }
        };
        callApi();
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

        const section = document.querySelector(".land1-content");
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

    const handleSeeMore = () => {
        setShowAll(!showAll); // Toggle the showAll state
    };

    return (
        <div className="land1">
            <div className={`land1-content ${inView ? "animate" : ""}`}>
                <p>Affected Areas</p>
                <h2>Support Our Team and <br /> Make a Difference</h2>
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
            <div ref={cardContainerRef} className="land1-card-container">
                {(showAll ? affectedares : affectedares.slice(0, 3)).map((affectedarea, index) => (
                    <div className="land1-card" key={affectedarea.id || index}>
                        <div className="land1-img">
                            <img src={`http://localhost:8000/${affectedarea.image}`} alt="" />
                        </div>
                        <div>
                            
                            <p className="p-button">{affectedarea.affectedtype?.title}</p>
                        </div>
                        <h3>{affectedarea.title}</h3>
                        <p>{affectedarea.description}</p>

                        <Link className="button" to={`/ask-for-aid/${affectedarea.id}`}>
                            <button>Ask For Aid</button>
                            <FontAwesomeIcon icon={faLocationArrow} />
                        </Link>
                    </div>
                ))}

            </div>
            <div className="button" style={{ width: "200px", margin: "0 auto" }}>
                <button style={{
                    textAlign: "center",
                    marginLeft: "40px"
                }} onClick={handleSeeMore}>{showAll ? "See Less--" : "See More--"}</button>
            </div>

            <div className="contact-img2">
                <img src={sprade} alt="" />
            </div>
        </div>
    );
};
