import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import logo from '../../Assests/Images/logo.jpeg';
import image from '../../Assests/Images/parrot1.jpg';
import image2 from '../../Assests/Images/owl1.jpg';
import footerpng from '../../Assests/Images/footer-right.png';
import sprade2 from '../../Assests/Images/sprade-light.png';
import sprade from '../../Assests/Images/sprade.png';
import { faAngleRight, faEnvelopeOpen, faMapMarkerAlt, faPaperPlane, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFacebookMessenger, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';


export const Footer = () => {



    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector(".footer-frist-section-content");
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll(".footer-second-section > div");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, index * 200); // Adds delay for staggered effect
                }
            });
        }, { threshold: 0.2 });

        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);

    return (
        <>
            <div className="footer">
                <div className="footer-frist-section">
                    <div className={`footer-frist-section-content ${isVisible ? "show" : ""}`}>
                        <h1>Subscribe to Our Newsletter</h1>
                        <p>Regular inspections and feedback mechanisms</p>
                    </div>
                    <div className="footer-frist-section-serchbx">
                        <form action="">
                            <input type="text" placeholder="Enter Your Email" />
                            <button type="submit" className='button'><span><FontAwesomeIcon icon={faPaperPlane} /></span></button>
                        </form>
                    </div>
                </div>

                <div className="border-footer"></div>

                <div className="footer-second-section">
                    <div className="footer-second-section-frist">
                        <div className="logo-section">
                            <img src={logo} alt="" />
                            <h3>RippleAid</h3>
                        </div>
                        <p>Lorem ipsum dolor amet consetetur adi pisicing elit sed eiusm tempor in cididunt ut labore dolore magna aliqua enim ad minim venitam</p>
                        <p>Quis nostrud exercita laboris nisi ut aliquip commodo exercita.</p>
                    </div>
                    <div className="footer-second-section-second">
                        <h3>Quick Links</h3>
                        <div className="border-links">
                            <span className="large-line"></span>
                            <span className="small-line"></span>
                            <span className="small-line"></span>
                        </div>
                        <ul>
                            <li><Link to="/"> <span><FontAwesomeIcon icon={faAngleRight} /></span> Home</Link></li>
                            <li><Link to="/about"><span><FontAwesomeIcon icon={faAngleRight} /></span> About Us</Link></li>
                            <li><Link to="/team"><span><FontAwesomeIcon icon={faAngleRight} /></span> Our Team</Link></li>
                            <li><Link to="/contact"><span><FontAwesomeIcon icon={faAngleRight} /></span> Contact Us</Link></li>
                        </ul>

                    </div>
                    <div className="footer-second-section-third">
                        <h3>Top News</h3>
                        <div className="border-links">
                            <span className="large-line"></span>
                            <span className="small-line"></span>
                            <span className="small-line"></span>
                        </div>
                        <div className="footer-second-section-third-contents">
                            <div className="footer-second-section-third-content">
                                <div className="footer-second-section-third-content-imgbx">
                                    <img src={image} alt="" />
                                </div>
                                <div className="footer-second-section-third-content-text">
                                    <h3>Unity in Giving Community Charity</h3>
                                    <p>01/03/2025</p>
                                </div>
                            </div>

                            <div className="footer-second-section-third-content">
                                <div className="footer-second-section-third-content-imgbx">
                                    <img src={image2} alt="" />
                                </div>
                                <div className="footer-second-section-third-content-text">
                                    <h3>Unity in Giving Community Charity</h3>
                                    <p>01/03/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-second-section-forth">
                        <h3>Get In Touch</h3>
                        <div className="border-links">
                            <span className="large-line"></span>
                            <span className="small-line"></span>
                            <span className="small-line"></span>
                        </div>
                        <div className="footer-second-section-forth-content">
                            <p><span><FontAwesomeIcon icon={faMapMarkerAlt} /></span> Flat-01,Block-A,Road No-01,Bosundhora,Dhaka</p>
                            <p><span><FontAwesomeIcon icon={faPhoneAlt} /></span> +88 01865016322</p>
                            <p><span><FontAwesomeIcon icon={faEnvelopeOpen} /></span> faltucoder@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="contact-img3" style={{  marginLeft: "1450px" }}>
                    <img src={footerpng} alt="" />
                </div>

                <div className="contact-img2" style={{  marginLeft: "1490px",marginTop:"400px" }}>
                    <img src={sprade2} alt="" />
                </div>

                <div className="contact-img2" style={{  marginTop: "190px", marginLeft: "-150px",width: "80px",height:"80px" }}>
                    <img src={sprade} alt="" />
                </div>

                <div className="footer-footer">
                    <div className="footer-footer-content">
                        <div className="footer-footer-content-text">
                            <ul>
                                <li><a href="">Contact Us |</a></li>
                                <li><a href="">Terms & Conditions |</a></li>
                                <li><a href="">Privacy Policy</a></li>
                            </ul>
                            <p>Copyright © 2025 Faltucoder. All rights reserved.</p>
                        </div>
                        <div className="footer-footer-content-icon">
                            <a href=""><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href=""><FontAwesomeIcon icon={faFacebookMessenger} /></a>
                            <a href=""><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href=""><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};