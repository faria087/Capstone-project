// import React, { useState, useEffect, inView } from 'react';
// import './index.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
// import { Header } from '../../Components/Header';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // breadcrums images
// import image from "../../Assests/Images/darkbread.jpg";
// import image2 from "../../Assests/Images/line.png";
// import image3 from "../../Assests/Images/sprade-light.png";
// import { ImageSlide2 } from '../../Components/imageslide2';
// import { Footer } from '../../Components/footer';

// //bread-crums image end


// export const AskForAidPage = () => {
//     const navigate = useNavigate();
//     const [name, setName] = React.useState([]);
//     const [phone, setPhone] = React.useState([]);
//     const [email, setEmail] = React.useState([]);
//     const [aid, setAid] = React.useState([]);
//     const [qty, setQty] = React.useState([]);
//     const [landingcard_id, setLandingCardId] = React.useState([]);
//     const [user_id, setUserId] = React.useState([]);

//     function notify() {
//         toast.success('Aid Created Successfully', {
//             position: "bottom-right",
//             autoClose: 10000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             style: {
//                 backgroundColor: '#4caf50', // Green background
//                 color: '#ffffff', // White text
//                 borderRadius: '5px',
//                 padding: '10px',
//             },
//         });
//     }


//     React.useEffect(() => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (user) {
//             setUserId(user.id);
//         }
//     }, []);

//     const nameChangeHandeler = (e) => {
//         setName(e.target.value);
//     }

//     const phoneChangeHandeler = (e) => {
//         setPhone(e.target.value);
//     }

//     const emailChangeHandeler = (e) => {
//         setEmail(e.target.value);
//     }

//     const aidChangeHandeler = (e) => {
//         setAid(e.target.value);
//     }

//     const qtyChangeHandeler = (e) => {
//         setQty(e.target.value);
//     }

//     const landingcardidChangeHandeler = (e) => {
//         setLandingCardId(e.target.value);
//     }

//     const useridChangeHandeler = (e) => {
//         setUserId(e.target.value);
//     }

//     const submitHandeler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('phone', phone);
//         formData.append('email', email);
//         formData.append('aid', aid);
//         formData.append('qty', qty);
//         formData.append('landingcard_id', landingcard_id);

//         formData.append('user_id', user_id);







//         await axios.post('http://localhost:8000/api/aids', formData)
//             .then((response) => {
//                 console.log(response.data);
//                 if (response?.data?.success) {
//                     navigate("/")
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             });

//     }
    
//     return (
//         <>
//             <div className="Ask-for-aid-page">
//                 <Header />
//                 <div className="breadcrums">
//                     <div className="breadcrums-imgbx">
//                         <img src={image} alt="" />
//                     </div>
//                     <div className="breadcrums-content">
//                         <h1>Ask For Aid </h1>
//                     </div>

//                     <div className="breadcrums-front-img">
//                         <img src={image2} alt="" />
//                     </div>

//                     <div className="stiker">
//                         <img src={image3} alt="" />
//                     </div>

//                     <div className="bread-crums-main-content">
//                         <div className="sub-content">
//                             <a href="">Home</a>
//                             <span>/</span>
//                             <a href="">Ask For Aid</a>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="ask-for-aid-content">
//                         <div className="ask-for-aid-content-heading">
//                             <h1>Ask For Aid</h1>
//                         </div>
//                         <div className="ask-for-aid-content-para">
//                             <p>Fill the form below to ask for aid</p>
//                         </div>
//                         <div className="ask-for-aid-form">
//                             <form onSubmit={submitHandeler}>
//                                 <div className="ask-for-aid-form-group">
//                                     <label for="name">Name</label>
//                                     <input type="text" id="name" placeholder="Enter your name" value={name} onChange={nameChangeHandeler}/>
//                                 </div>
//                                 <div className="ask-for-aid-form-group">
//                                     <label for="email">Email</label>
//                                     <input type="email" id="email" placeholder="Enter your email" value={email} onChange={emailChangeHandeler}/>
//                                 </div>
//                                 <div className="ask-for-aid-form-group">
//                                     <label for="phone">Phone</label>
//                                     <input type="text" id="phone" placeholder="Enter your phone number" value={phone} onChange={phoneChangeHandeler}/>
//                                 </div>
//                                 <div className="ask-for-aid-form-group">
//                                     <label for="aids">Aids</label>
//                                     <input type="text" id="aids" placeholder="Enter your aids" value={aid} onChange={aidChangeHandeler}/>
//                                 </div>
//                                 <div className="ask-for-aid-form-group">
//                                     <label for="qty">Person Qty</label>
//                                     <input type="text" id="qty" placeholder="Enter your person qty" value={qty} onChange={qtyChangeHandeler}/>
//                                 </div>
//                                 <input type="hidden" value={landingcard_id} onChange={landingcardidChangeHandeler} />
//                                 <input type="hidden" value={user_id} onChange={useridChangeHandeler} />

//                                 <div className="button" style={{ width: "30%", margin: "0 auto" }}>
//                                     <button style={{ textAlign: "center", marginLeft: "260px" }} onClick={notify}>Submit</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 <ImageSlide2 />
//                 <Footer />
//             </div>
//         </>
//     );
// };


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './index.css';
import { Header } from '../../Components/Header';
import { ImageSlide2 } from '../../Components/imageslide2';
import { Footer } from '../../Components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";

export const AskForAidPage = () => {
    const { id } = useParams(); // Get the landing card ID from the URL
    const navigate = useNavigate();
    
    const [cardData, setCardData] = useState(null); // State for landing card data
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [aid, setAid] = useState('');
    const [qty, setQty] = useState('');
    const [user_id, setUserId] = useState('');

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/landingcards/${id}`);
                if (response?.data?.success) {
                    setCardData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching landing card data:", error);
            }
        };

        fetchCardData();
    }, [id]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserId(user.id);
        }
    }, []);

    const submitHandeler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('aid', aid);
        formData.append('qty', qty);
        formData.append('landingcard_id', id); // Use id from URL
        formData.append('user_id', user_id);

        try {
            const response = await axios.post('http://localhost:8000/api/aids', formData);
            if (response?.data?.success) {
                toast.success('Aid Created Successfully', { position: "bottom-right" });
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting aid request:", error);
            toast.error("Error submitting form");
        }
    };

    return (
        <>
            <div className="Ask-for-aid-page">
                <Header />

                {/* Breadcrumbs Section */}
                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Ask For Aid</h1>
                    </div>
                    <div className="breadcrums-front-img">
                        <img src={image2} alt="" />
                    </div>
                    <div className="stiker">
                        <img src={image3} alt="" />
                    </div>
                    <div className="bread-crums-main-content">
                        <div className="sub-content">
                            <a href="/">Home</a>
                            <span>/</span>
                            <a href="/ask-for-aid">Ask For Aid</a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="ask-for-aid-content">
                    <div className="ask-for-aid-content-heading">
                        <h1>Ask For Aid</h1>
                    </div>
                    <div className="ask-for-aid-content-para">
                        <p>Fill the form below to ask for aid</p>
                    </div>

                    <div className="ask-for-aid-container">
                        {/* Left Section: Landing Card Details */}
                        {cardData && (
                            <div className="ask-for-aid-card">
                                <img src={`http://localhost:8000/${cardData.image}`} alt={cardData.title} />
                                <h3>{cardData.title}</h3>
                                <p>{cardData.description}</p>
                            </div>
                        )}

                        {/* Right Section: Form */}
                        <div className="ask-for-aid-form">
                            <form onSubmit={submitHandeler}>
                                <div className="ask-for-aid-form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="ask-for-aid-form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="ask-for-aid-form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="ask-for-aid-form-group">
                                    <label htmlFor="aids">Aids</label>
                                    <input type="text" id="aids" placeholder="Enter your aid request" value={aid} onChange={(e) => setAid(e.target.value)} />
                                </div>
                                <div className="ask-for-aid-form-group">
                                    <label htmlFor="qty">Person Qty</label>
                                    <input type="text" id="qty" placeholder="Enter person quantity" value={qty} onChange={(e) => setQty(e.target.value)} />
                                </div>
                                
                                {/* Hidden Inputs */}
                                <input type="hidden" value={id} />
                                <input type="hidden" value={user_id} />

                                <div className="button" style={{ width: "100%", marginTop: "20px" }}>
                                    <button type="submit" style={{ marginLeft: "320px" }}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ImageSlide2 />
                <Footer />
                <ToastContainer />
            </div>
        </>
    );
};
