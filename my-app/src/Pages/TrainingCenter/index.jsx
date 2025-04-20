import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./index.css";
import { Header } from "../../Components/Header";

import { ImageSlide2 } from "../../Components/imageslide2";
import { Footer } from "../../Components/footer";

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
//bread-crums image end

export const TrainingCenter = () => {

    const navigate = useNavigate();
    const [tcenters, setTcenters] = useState([]);
    




    useEffect(() => {
        const fetchTcenters = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/tcenters");
                const data = await response.json();
                if (data.success) {
                    setTcenters(data.data);
                } else {
                    console.error("Failed to fetch Tcenters:", data.message);
                }
            } catch (error) {
                console.error("Error fetching Tcenters:", error);
            }
        };

        fetchTcenters();
    }
        , []);


  




    return (
        <>
            <div className="training-center">
                <Header />

                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Training Center</h1>
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
                            <a href="">Training Center</a>
                        </div>
                    </div>
                </div>

                <div className="t-centers">
                    {tcenters.map((tcenter) => (
                        <div className="t-center-card">
                            <div className="t-center-img-bx">
                                <img src={`http://localhost:8000/${tcenter.image}`} alt="" />
                                <p>{tcenter.center_type}</p>
                            </div>
                            <div className="t-center-content">
                                <h2>{tcenter.title}</h2>
                                <h3>{tcenter.location}</h3>
                                <p>{tcenter.description}</p>
                                <div className="border-line"></div>
                                <p>Opening Hours: <span>{tcenter.opening_hours}</span></p>
                                <p>Closing Hours: <span>{tcenter.closing_hours}</span></p>
                                <div className="t-center-btns">
                                    <Link to={`/tcenter-view/${tcenter.id}`} className="btn">View More</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
};
