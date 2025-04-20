import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './index.css';
import { Link,useNavigate } from 'react-router-dom';
import { Header } from '../../Components/Header';
import { jwtDecode } from "jwt-decode";
// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
import { ImageSlide2 } from '../../Components/imageslide2';
import { Footer } from '../../Components/footer';
//bread-crums image end

import image4 from "../../Assests/Images/signup.gif";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const nameChangeHandeler = (e) => {
        setName(e.target.value);
    }
    const emailChangeHandeler = (e) => {
        setEmail(e.target.value);
    }
    const imageChangeHandeler = (e) => {
        setImage(e.target.files[0]);
    }
    const passwordChangeHandeler = (e) => {
        setPassword(e.target.value);
    }
    const confirmPasswordChangeHandeler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const submitHandeler = (e) => {
        e.preventDefault();
    
        if (password !== password_confirmation) {
            alert("Passwords do not match. Please check your input.");
            return; // Stop further submission
        }
    
        // Create a FormData object
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", password_confirmation);
        formData.append("image", image); // Append the image file
    
        // Send the request with FormData
        Axios.post("http://localhost:8000/api/register", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type
            },
        })
        .then((response) => {
            if (response?.data?.success) {
                alert("Registration successful.");
                navigate("/login");
            } else {
                alert("Registration failed. Please try again.");
            }
        })
        .catch((err) => {
            console.error("Registration error:", err);
            alert("An error occurred during registration.");
        });
    };
    


    return (
        <>
            <div className="login">
                <Header />
                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Sign Up</h1>
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
                            <a href="">Sign Up</a>
                        </div>
                    </div>
                </div>
                <div className="from-div">
                    <div className="from-img-bx">
                        <img src={image4} alt="" />
                    </div>
                    <div className="from-content">
                        <form action="" onSubmit={submitHandeler} encType="multipart/form-data">
                        <div className="from-input">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Enter Name" value={name} onChange={nameChangeHandeler}/>
                            </div>
                            <div className="from-input">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={emailChangeHandeler}/>
                            </div>
                            {/* <div className="from-input">
                                <label htmlFor="phone">Phone</label>
                                <input type="number" id="phone" name="phone" placeholder="Enter Phone" onChange={imageChangeHandeler}/>
                            </div> */}
                            {/* <div className="from-input">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" placeholder="Enter Address" />
                            </div> */}
                            {/* <div className="from-input">
                                <label htmlFor="profession">Profession</label>
                                <input type="text" id="profession" name="profession" placeholder="Enter Profession" />
                            </div> */}
                            <div className="from-input">
                                <label htmlFor="image">Image</label>
                                <input type="file" id="image" name="image" onChange={imageChangeHandeler}/>
                                {image && <img src={URL.createObjectURL(image)} alt="image" width={200} height={200} />}
                            </div>
                            <div className="from-input">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Enter Password" value={password} onChange={passwordChangeHandeler}/>
                            </div>
                            <div className="from-input">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" name="confirm-password" placeholder="Enter Confirm Password"  value={password_confirmation} onChange={confirmPasswordChangeHandeler}/>
                            </div>
                            <div className="from-input">
                                <button type="submit" className="button"><span style={{marginLeft:"220px"}}>Sign Up</span></button>
                            </div>
                            <div className="from-input">
                                <p>Have an account? <Link to="/login"><b>Sign In!</b></Link></p>
                            </div>
                        </form>
                    </div>
                </div>
                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
};
