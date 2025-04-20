

import React, { useState, useEffect, useRef, use } from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd, faPhone } from "@fortawesome/free-solid-svg-icons";
import raj from '../../Assests/Images/raj.png';

export const Team = () => {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);


    const [inView, setInView] = useState(false);
    const cardContainerRef = useRef(null);

    const [abouts, setAbouts] = useState([]);






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

        const section = document.querySelector(".team-content");
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
        let interval;

        const startAutoScroll = () => {
            interval = setInterval(() => {
                if (sliderRef.current && !isPaused) {
                    sliderRef.current.scrollLeft += 1; // Moves left to right smoothly
                }
            }, 15); // Adjust speed here
        };

        startAutoScroll();

        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        const fetchAbouts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/abouts");
                const data = await response.json();
                if (data.success) {
                    setAbouts(data.data);
                }
            } catch (error) {
                console.error('Error fetching abouts:', error);
            }
        };

        fetchAbouts();
    }, []);

    return (
        <div className="team">
            <div className={`team-content ${inView ? "animate" : ""}`}>
                <p>Supporting Our Cause Together</p>
                <h2>Meet Our Dedicated <br /> Team Members</h2>
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

            <div
                className="team-member"
                ref={sliderRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="team-members">
                    {abouts.map((item, i) => (
                        <div key={i} className="team-members-card">
                            <div className="circle"></div>
                            <div className="team-member-img">
                                <img src={`http://localhost:8000/${item.image}`} alt={item.name} />
                            </div>
                            <div className="team-member-des">
                                <p>{item.designation || 'Volunteer'}</p>
                                <h2>{item.name}</h2>
                                <p className="call"><FontAwesomeIcon icon={faPhone} /> Call : 017000000000</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};
