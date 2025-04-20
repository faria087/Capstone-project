import React from "react";

import './index.css';
import { Header } from "../../Components/Header";
import { ImageSlide2 } from "../../Components/imageslide2";
import { Footer } from "../../Components/footer";


// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
import { Contact } from "../../Components/contact";
//bread-crums image end

export const ContactPage = () => {
    return (
        <>
            <div className="contact-page">
                <Header />
                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Contact Us</h1>
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
                            <a href="">Contact Us</a>
                        </div>
                    </div>
                </div>
                <Contact />
                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
};
