import React,{ useState, useEffect } from 'react';

import './index.css';
import { Link,useNavigate } from 'react-router-dom';
import { Header } from '../../Components/Header';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
import { ImageSlide2 } from '../../Components/imageslide2';
import { Footer } from '../../Components/footer';
//bread-crums image end

import image4 from "../../Assests/Images/login.gif";

export const Login = () => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    console.log(decoded);
  };



  // Handle form field changes
  const emailChangeHandler = (e) => setEmail(e.target.value);
  const passwordChangeHandler = (e) => setPassword(e.target.value);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("login", email);
    formData.append("password", password);

    axios
      .post("http://localhost:8000/api/login", formData)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/be");
        } // Redirect to a dashboard or another page
      })
      .catch((err) => {
        console.log(err);
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
                        <h1>Login</h1>
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
                            <a href="">Log in</a>
                        </div>
                    </div>
                </div>
                <div className="from-div">
                    <div className="from-img-bx">
                        <img src={image4} alt="" />
                    </div>
                    <div className="from-content">
                        <form action="" onSubmit={submitHandler}>
                            <div className="from-input">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={emailChangeHandler}/>
                            </div>
                            <div className="from-input">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Enter Password" value={password} onChange={passwordChangeHandler}/>
                            </div>
                            <div className="from-input">
                                <button type="submit" className="button"><span style={{marginLeft:"220px"}}>Login</span></button>
                            </div>
                            <div className="from-input">
                                <p>Don't have an account? <Link to="/signup"><b>Sign Up</b></Link></p>
                            </div>

                            <div className="from-input">
                                <p>Join to Volunteer <Link to="/vsignup"><b>Volunteer Sign Up</b></Link></p>
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
