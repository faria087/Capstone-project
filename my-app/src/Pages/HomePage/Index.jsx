

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../Components/Header";
import { Slider } from "../../Components/Slider";
import { ImageSlider } from "../../Components/imageslider";
import { About } from "../../Components/About";
import { Land1 } from "../../Components/land1";
import { Land2 } from "../../Components/land2";
import { Land3 } from "../../Components/land3";
import { Land4 } from "../../Components/land4";
import { Land5 } from "../../Components/land5";
import { Team } from "../../Components/team";
import { Faq } from "../../Components/faq";
import { Contact } from "../../Components/contact";
import { Story } from "../../Components/story";
import { ImageSlide2 } from "../../Components/imageslide2";
import { Footer } from "../../Components/footer";
import GoogleMapComponent from "../../Components/Googlemap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// Import Map Component

export const HomePage = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/landingcards")
            .then(response => {
                if (response?.data?.success) {
                    setLocations(response.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching locations:", error);
            });
    }, []);

    return (
        <div className="home-page" style={{ background: "black", color: "white" }}>
            {/* <Cursor /> */}
            <Header />
            <div className="slider">
                <Slider />
            </div>
            <ImageSlider />

            <About />
            <Land1 />
            <div className="map-container">
                <GoogleMapComponent locations={locations} />
            </div>
            <Land2 />
            <Land3 />
            <Land4 />
            <div style={{}}>
                <Land5 />
            </div>
            <Team />
            <Faq />
            <Contact />
            <Story />
            <ImageSlide2 />
            <a
                href="https://wa.me/01568527894" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#25D366",
                    color: "white",
                    borderRadius: "50%",
                    padding: "15px",
                    zIndex: 1000,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    fontSize: "24px",
                    height: "80px",
                    width: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FontAwesomeIcon icon={faWhatsapp} style={{height: "60",
                    width: "60",}}/>
            </a>

            <Footer />
        </div>
    );
};
