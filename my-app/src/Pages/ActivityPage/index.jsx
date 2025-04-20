



import React, { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/footer';

import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import './index.css';
import { ImageSlide2 } from '../../Components/imageslide2';

export const AllActivities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/activities");
                const data = await response.json();
                if (data.success) {
                    setActivities(data.data.slice(4)); // Skip first 4
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div className="affected-area-page">
            <Header />
            <div className="breadcrums">
                <div className="breadcrums-imgbx">
                    <img src={image} alt="" />
                </div>
                <div className="breadcrums-content">
                    <h1>Activity</h1>
                </div>
                <div className="breadcrums-front-img">
                    <img src={image2} alt="" />
                </div>
                <div className="stiker">
                    <img src={image3} alt="" />
                </div>
                <div className="bread-crums-main-content">
                    <div className="sub-content">
                        <a href="/">Home</a>
                        <span>/</span>
                        <a href="/activities">Activity</a>
                    </div>
                </div>
            </div>

            {/* SIMPLIFIED CARDS SECTION */}
            <div className="all-activities-grid" style={{ padding: "60px 80px" }}>
    {activities && activities.length > 0 ? (
        activities.map((activity, index) => (
            <div className="grid-item" key={index}>
                <div className="grid-item-img">
                    <img src={`http://localhost:8000/${activity.image}`} alt={activity.title} />
                </div>
                <div className="grid-item-icon">
                    <a href="#"><FontAwesomeIcon icon={faLocationArrow} /></a>
                </div>
                <div className="grid-item-content">
                    <p>{activity.tag}</p>
                    <h2>{activity.title}</h2>
                </div>
            </div>
        ))
    ) : (
        <p style={{ textAlign: 'center', width: '100%' }}>No activities to show.</p>
    )}
</div>

            <ImageSlide2 />
            <Footer />
        </div>
    );
};

