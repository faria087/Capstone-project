import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../Components/Header';
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
import { ImageSlide2 } from '../../Components/imageslide2';
import { Footer } from '../../Components/footer';

export const DonatePage = () => {
    const { id } = useParams();
    const [donations, setDonations] = useState([]);
    const [totalDonation, setTotalDonation] = useState(0);

    
    useEffect(() => {
        const callApi = async () => {
            try {
                const token = localStorage.getItem("token"); // Token Storage থেকে আনুন
                const response = await axios.get("http://localhost:8000/api/donations", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
    
                if (response?.data?.success) {
                    const donationData = response.data.data;
                    setDonations(donationData);
    
                    // Calculate total donation amount
                    const totalAmount = donationData.reduce((total, donation) => total + parseFloat(donation.amount || 0), 0);
                    setTotalDonation(totalAmount); // Set the total donation balance here
                }
            } catch (error) {
                console.error("Error fetching donations:", error);
            }
        };
    
        callApi();
    }, []); // Re-fetch donations when component loads
    

    return (
        <>
            <div className="donatepage">
                <Header />
                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Distribution</h1>
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
                            <a href="">Distribution</a>
                        </div>
                    </div>
                </div>

                <div className="donatepage-content">
                    <h1>Total Balance :
                        <span> {totalDonation} /=</span>
                    </h1>

                    <form action="" >
                        <div className="donatepage-content-form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" id="amount" placeholder="Enter Amount" />
                        </div>

                        <div className="donatepage-content-form-group">
                            <label htmlFor="payment">Payment Method</label>
                            <select name="payment" id="payment" >
                                <option value="Bkash">Bkash</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Nagad">Nagad</option>
                            </select>
                        </div>

                        <input type="hidden"  />

                        <button>Donate</button>
                    </form>
                </div>

                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
};
