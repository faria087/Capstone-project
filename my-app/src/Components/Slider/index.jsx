import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./index.css";

import Image from "../../Assests/Images/crow.jpg";
import Image2 from "../../Assests/Images/eagel1.jpg";



export const Slider = () => {
    const [sliders, setSliders] = React.useState([]);

    React.useEffect(() => {
        const callApi = async () => {
            const response = await axios.get("http://localhost:8000/api/sliders");
            if (response?.data?.success) {
                setSliders(response?.data?.data);
            }
        };
        callApi();
    }, []);
    

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);
    return (

        <div>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >



{sliders.map((slider, index) => (

                <SwiperSlide>
                    {({ isActive }) => (
                        <div>Current slide is {isActive ? 'active' : 'not active'}</div>
                    )}
                    <div>
                        <div className="image">
                            <img src={`http://localhost:8000/${slider.image}`} alt="logo" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="title-content">
                            <h3>
                            {slider.short_title}
                            </h3>
                            <h1>{slider.title}</h1>
                            <p className="border"></p>
                            <p>{slider.description}</p>
                            <button>Show More</button>
                        </div>
                    </div>
                </SwiperSlide>
  ))};
                




            </Swiper>


        </div>


    );
};

