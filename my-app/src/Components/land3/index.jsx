
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import axios from 'axios';

import {Navigate, useNavigate} from 'react-router-dom';
import "./index.css";
import image1 from '../../Assests/Images/img1.png';
import image2 from '../../Assests/Images/img3.png';
import sprade from '../../Assests/Images/gift.png';
import sprade1 from '../../Assests/Images/sprade.png';

export const Land3 = () => {
    const containerRef = useRef(null);
    const [amount, setAmount] = useState(""); // State to track the donation amount
    const [isCustom, setIsCustom] = useState(false); // Track if custom input is selected
    const [payment_method, setPaymentMethod] = useState(""); // State to track the payment method
    const [user_id, setUserId] = useState(""); // State to track the user id



    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            },
            { threshold: 0.2 } // Element becomes visible at 20%
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

        useEffect(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setUserId(user.id);
            }
        }, []);

        const paymentHandeler = (e) => {
            setPaymentMethod(e.target.value);
        };
        

       

        // const submitHandler = async (e) => {
        //     e.preventDefault();
        //     const token = localStorage.getItem("token"); // Get the stored token
        
        //     const formData = new FormData();
        //     formData.append("amount", amount);
        //     formData.append("payment_method", payment_method);
        //     formData.append("user_id", user_id);
        
        //     try {
        //         const response = await axios.post('http://localhost:8000/api/donations', formData, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`, // Attach token
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         });
        
        //         if (response?.data?.success) {
        //             toast.success('Donation Created Successfully', { position: "bottom-right" });
        //             setAmount("");
        //             setPaymentMethod("");
        //             Navigate('/'); // Fix Navigate function issue
        //         }
        //     } catch (error) {
        //         console.error(error.response);
        //         toast.error('Something went wrong', { position: "bottom-right" });
        //     }
        // };
        
        const submitHandler = async (e) => {
            e.preventDefault();
            if (!amount || !payment_method) {
                toast.error('Please enter an amount and select a payment method', { position: "bottom-right" });
                return;
            }
        
            const token = localStorage.getItem("token"); // Get the stored token
        
            const formData = new FormData();
            formData.append("amount", amount);
            formData.append("payment_method", payment_method);
            formData.append("user_id", user_id);
        
            try {
                const response = await axios.post('http://localhost:8000/api/donations', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token
                        "Content-Type": "multipart/form-data",
                    },
                });
        
                if (response?.data?.success) {
                    toast.success('Donation Created Successfully', { position: "bottom-right" });
                    setAmount("");
                    setPaymentMethod(""); 
                    setIsCustom(false);
                    Navigate('/'); 
                }
            } catch (error) {
                console.error(error.response);
                toast.error('Something went wrong', { position: "bottom-right" });
            }
        };
        



    return (
        <div className="land3">
            <div className="land3-bg-img">
                <img src={image1} alt="" />
            </div>
            <div ref={containerRef} className="land3-container">
                <div className="lnd3-content">
                    <p>Start donating to poor people</p>
                    <h1>Join The Community To Give <br />Education For Children</h1>
                </div>
                <div className="lnd3-content-card">
                    <div className="land3-content-card-content">
                        <h2>Support Where It Counts.</h2>
                        <p>Your Donation :</p>
                        <form action="" onSubmit={submitHandler}>
                            <div className="input">
                                <label htmlFor=""><span><FontAwesomeIcon icon={faDollarSign} /></span></label>
                                <input
                                    type="text"
                                    placeholder="Enter your Amount"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        setIsCustom(true); // Enable custom mode when user types
                                    }}
                                />
                            </div>
                            <div className="land3-btn-bx">
                                {[20, 50, 100, 200].map(amount => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => {
                                            setAmount(amount);
                                            setIsCustom(false); // Disable custom mode when preset value is selected
                                        }}
                                    >
                                        {amount}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAmount(""); // Clear input
                                        setIsCustom(true); // Enable custom mode
                                    }}
                                >
                                    Custom
                                </button>
                            </div>
                            <h1>Select Payment Method</h1>
                            {/* <div className="pay-method">
                                <div className="pay-method-card">
                                    <input type="radio" name="pay" id="pay1" value={payment_method} onChange={paymentHandeler}/>
                                    <label htmlFor="pay1">Mobile Banking</label>
                                </div>
                                <div className="pay-method-card">
                                    <input type="radio" name="pay" id="pay2" value={payment_method} onChange={paymentHandeler}/>
                                    <label htmlFor="pay2">Offline Donation</label>
                                </div>
                                <div className="pay-method-card">
                                    <input type="radio" name="pay" id="pay3" value={payment_method} onChange={paymentHandeler}/>
                                    <label htmlFor="pay3">Credit Card</label>
                                </div>
                            </div> */}

<div className="pay-method">
    <div className="pay-method-card">
        <input type="radio" name="pay" id="pay1" value="Mobile Banking" onChange={paymentHandeler} />
        <label htmlFor="pay1">Mobile Banking</label>
    </div>
    <div className="pay-method-card">
        <input type="radio" name="pay" id="pay2" value="Offline Donation" onChange={paymentHandeler} />
        <label htmlFor="pay2">Offline Donation</label>
    </div>
    <div className="pay-method-card">
        <input type="radio" name="pay" id="pay3" value="Credit Card" onChange={paymentHandeler} />
        <label htmlFor="pay3">Credit Card</label>
    </div>
</div>

                            <div className="button" style={{ marginTop: "20px", width: "200px" }}>
                                <button style={{ textAlign: "center", marginLeft: "40px" }}>Donate Now</button>
                            </div>
                            <input type="hidden" name="" id="" value={user_id}/>
                        </form>
                    </div>
                    <div className="land3-content-card-img">
                        <img src={image2} alt="" />
                    </div>
                </div>
            </div>
            <div className="contact-img22">
                <img src={sprade} alt="" />
            </div>
            <div className="contact-img2" style={{ marginTop: "200px", rotate: "430deg", marginLeft: "1450px" }}>
                <img src={sprade1} alt="" />
            </div>
        </div>
    );
}; 