import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import { Header } from '../../Components/Header';

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
import { ImageSlide2 } from '../../Components/imageslide2';
import { Footer } from '../../Components/footer';
import { Story } from '../../Components/story';
//bread-crums image end

export const PostPage = () => {
    return (
        <div className="affected-area-page">
            <Header />
            <div className="breadcrums">
                <div className="breadcrums-imgbx">
                    <img src={image} alt="" />
                </div>
                <div className="breadcrums-content">
                    <h1>Posts</h1>
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
                        <a href="">Posts</a>
                    </div>
                </div>
            </div>
            <div >
            <Story showAll={true} />
                <ImageSlide2 />
                <Footer />
            </div>
        </div>
    );
};
