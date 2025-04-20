


import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import { Header } from "../../Components/Header";
import { ImageSlide2 } from "../../Components/imageslide2";
import { Footer } from "../../Components/footer";
import moment from "moment";

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";

//bread-crums image end

export const DonationPage = () => {
    const [donations, setDonations] = React.useState([]);
    const [totalDonation, setTotalDonation] = React.useState(0);

    React.useEffect(() => {
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
                    setTotalDonation(totalAmount);
                }
            } catch (error) {
                console.error("Error fetching donations:", error);
            }
        };
        callApi();
    }, []);

    return (
        <>
            <div className="donationpage">
                <Header />
                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Donations</h1>
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
                            <a href="">Donations</a>
                        </div>
                    </div>
                </div>
                <div style={{ padding: "0 10%" ,marginBottom:"50px"}}>	
                    <div className="aid-control">
                        <h1>Donations </h1>

                        <table style={{minHeight:"300px"}}>
                            <thead>
                                <tr>
                                    <th>SL No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone no</th>
                                    <th>Payment Type</th>
                                    <th>Amount</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation, index) => (
                                    <tr key={donation._id}>
                                        <td>{index + 1}</td>
                                        <td>{donation?.user?.name}</td>
                                        <td>{donation?.user?.email}</td>
                                        <td>{donation?.user?.phone}</td>
                                        <td>{donation.payment_method}</td>
                                        <td>{donation.amount}</td>
                                        <td>{moment(donation.createdAt).format("DD-MM-YYYY")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                                
                        <p style={{color: "#ffff"}}><strong>Total Donation: </strong>{totalDonation.toFixed(2)}/=</p>
                    </div>


                </div>
                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
}
