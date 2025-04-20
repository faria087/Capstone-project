import React from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/footer";
import { About } from "../../Components/About";
import "./index.css";
import { ImageSlide2 } from "../../Components/imageslide2";

import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";

export const AboutPage = () => {
    return (
        <div className="about-page">
            <Header />
            <div className="breadcrums">
                <div className="breadcrums-imgbx">
                    <img src={image} alt="" />
                </div>
                <div className="breadcrums-content">
                    <h1>About Us</h1>
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
                        <a href="">About Us</a>
                    </div>
                </div>
            </div>
            <div className="about-section">
                <About />
            </div>
            <ImageSlide2 />
            <Footer />

        </div>
    );
};
