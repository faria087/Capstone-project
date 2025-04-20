

import React, { useState,useEffect,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import image from "../../Assests/Images/AP23094122668072.png";
import image2 from "../../Assests/Images/Ankara-ds-1.jpg";

export const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [inView, setInView] = useState(false);
    // ✅ Toggle Function
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        { question: "How can I contact you?", answer: "Our team is available 24/7 to answer your questions. You can contact us through our contact page." },
        { question: "What services do you provide?", answer: "We offer a variety of services including customer support, consultation, and technical assistance." },
        { question: "Do you have a refund policy?", answer: "Yes, we offer a 30-day refund policy for eligible purchases." },
        { question: "How do I track my order?", answer: "You can track your order by visiting our order tracking page and entering your order number." },
    ];


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
    
            const section = document.querySelector(".faq-section");
            if (section) {
                observer.observe(section);
            }
    
            return () => {
                if (section) {
                    observer.unobserve(section);
                }
            };
        }, []);


    return (
        <div className="faq">
            <div className={`faq-section ${inView ? "animate" : ""}`}>
                <div className="faq-content">
                    <div className="faq-content-section-1">
                        <p>Answers to Common Inquiries</p>
                        <h1>Frequently Asked Questions</h1>
                    </div>

                    <div className="faq-content-section-question-ans">
                        {faqData.map((faq, index) => (
                            <div key={index} className="faq-content-section-question">
                                <div
                                    className={`qus ${openIndex === index ? "active" : ""}`}
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <h2>{faq.question}</h2>
                                    <span>
                                        <FontAwesomeIcon icon={openIndex === index ? faChevronDown : faChevronRight} />
                                    </span>
                                </div>
                                {openIndex === index && <p>{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="faq-img-box">
                    <div className="faq-img-box-back-img">
                        <img src={image} alt="FAQ" />
                    </div>
                    <div className="faq-img-box-front-img">
                        <img src={image2} alt="FAQ" />
                    </div>
                    <div className="img-ber"></div>
                </div>
            </div>
        </div>
    );
};
