import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";
import image1 from '../../Assests/Images/img1.png';
import image2 from '../../Assests/Images/slide2.jpg';
import sprade from '../../Assests/Images/spade-green-two.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";


export const Land2 = () => {

    const [currentBalance, setCurrentBalance] = React.useState(0);




    React.useEffect(() => {
        const callApi = async () => {  
            const response = await axios.get("http://localhost:8000/api/funds");
            if (response?.data?.success) {
                setCurrentBalance(response?.data?.data[0]?.current_balance);
            }
        };
        callApi();
    }, []);
    

    useEffect(() => {
        const elements = document.querySelectorAll(".land2-img-bx, .container-bx");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(element => observer.observe(element));

        return () => {
            elements.forEach(element => observer.unobserve(element));
        };
    }, []);

    return (
        <>
            <div className="land2">
                <div className="land2-img-bx">
                    <div className="land2-bg-img">
                        <img src={image1} alt="" />
                        <a
                            href="https://www.youtube.com/watch?v=6cfjJexnuDk&list=RDaky_XNjjOUs&index=3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-icon"
                        >
                            ▶
                        </a>
                        <div className="land2-front-img">
                            <img src={image2} alt="" />
                        </div>
                    </div>

                </div>

                <div className="container-bx">
                    <div className="container-bx-content">
                        <p className="bx-content-subtitle">Start Donating Poor People</p>
                        <h1>Donate Support to Make <br />Difference way</h1>
                        <p>Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing issues like poverty,</p>
                    </div>
                    <div className="content2">
                        <div className="content2-left">
                            <div className="button-bx">
                                <a href="">Our Mission</a>
                                <a href="">Our Vision</a>
                                <a href="">Excellence</a>
                            </div>
                            <div className="border-bx"></div>

                            <div className="content2-left-content">
                                <p><span><FontAwesomeIcon icon={faCheck} /></span> We help companies develop powerful corporate social</p>
                                <p><span><FontAwesomeIcon icon={faCheck} /></span> Helped fund 3,265 Project powerful corporate poor</p>
                                <p><span><FontAwesomeIcon icon={faCheck} /></span> Dedicated Tech Services</p>
                            </div>

                            <div className="round-ber-card-container">
                                <div className="round-ber-card">
                                    <div className="value">75%</div>
                                    <div className="lavel">Treatment
                                        Helping</div>
                                </div>
                                <div className="round-ber-card">
                                    <div className="value">25%</div>
                                    <div className="lavel">Highest Fund Raised</div>
                                </div>
                            </div>
                        </div>
                        <div className="content2-right">
                            <div className="content2-right-card">
                                <div className="content2-right-card-icon">
                                    <span><FontAwesomeIcon icon={faDonate} /></span>
                                </div>
                                <div className="content2-right-card-content">
                                    <h1>Donate Now</h1>
                                    <p>$ 100</p>
                                </div>
                            </div>

                            <div className="content2-right-card">
                                <div className="content2-right-card-icon">
                                    <span><FontAwesomeIcon icon={faBitcoin} /></span>
                                </div>

                                <div className="content2-right-card-content">
                                    <h1>Total Fundraised</h1>
                                    <p>
                                        ${currentBalance}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-img2" style={{ marginTop: "120px", marginLeft: "1450px" }}>
                    <img src={sprade} alt="" />
                </div>
            </div>
        </>
    );
};