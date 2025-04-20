import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";

import "./index.css";

export const TCenterCreatePage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [opening_hours, setOpening_hours] = useState("");
    const [closing_hours, setClosing_hours] = useState("");
    const [center_type, setCenter_type] = useState("");
    const [image, setImage] = useState(null);

    const titleChangeHandeler = (e) => {
        setTitle(e.target.value);
    }

    const locationChangeHandeler = (e) => {
        setLocation(e.target.value);
    }

    const descriptionChangeHandeler = (e) => {
        setDescription(e.target.value);
    }

    const opening_hoursChangeHandeler = (e) => {
        setOpening_hours(e.target.value);
    }

    const closing_hoursChangeHandeler = (e) => {
        setClosing_hours(e.target.value);
    }


    const imageChangeHandeler = (e) => {
        setImage(e.target.files[0]);
    }


 
    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            const response = await axios.get("http://localhost:8000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.success) {
                setUsers({
                    totalUser: response?.data?.data?.totalUser,
                    totalVolunteer: response?.data?.data?.totalVolunteer,
                });
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);



    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };







    // const submitHandeler = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("title", title);
    //     formData.append("location", location);
    //     formData.append("description", description);
    //     formData.append("opening_hours", opening_hours);
    //     formData.append("closing_hours", closing_hours);
    //     formData.append("center_type", center_type);
    //     formData.append("image", image);
    //     formData.append('_method', 'POST');


    //     await axios.post('http://localhost:8000/api/tcenters', formData)
    //         .then((response) => {
    //             if (response?.data?.success) {
    //                 navigate(-1)
    //             }
    //         })
    // }


    const submitHandeler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("opening_hours", opening_hours.trim());  // e.g., "08:00"
        formData.append("closing_hours", closing_hours.trim());  // e.g., "17:00"
        formData.append("center_type", center_type);
        formData.append("image", image);
        formData.append('_method', 'POST');
    
        try {
            const response = await axios.post('http://localhost:8000/api/tcenters', formData);
            if (response?.data?.success) {
                navigate(-1);
            }
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
        }
    };
    

    return (
        <>
            <div className="admin">
                {/* Header */}
                <div className="admin-header">
                    <div className="admin-header-img-bx">
                        <img src={image1} alt="Logo" />
                        <h1 >RippleAid</h1>
                        <span onClick={toggleSidebar} className="menu-icon">
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </div>

                    <div className="admin-header-serch-bx">
                        <form action="">
                            <input type="text" placeholder="Search" />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                    </div>

                    <div className="admin-header-user-bx">
                        <div className="admin-header-icon">
                            <span><FontAwesomeIcon icon={faBell} /></span>
                        </div>
                        {user ? (
                            <img src={user.image ? `http://localhost:8000/${user.image}` : "/default-avatar.png"} alt="User" />
                        ) : (
                            <img src={image2} alt="User" />
                        )}

                        <form action=""
                            onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    const token = localStorage.getItem("token");
                                    const response = await axios.post(
                                        "http://localhost:8000/api/logout",
                                        {},
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`, // Token পাঠানো হচ্ছে
                                            },
                                        }
                                    );

                                    if (response?.data?.message === "Successfully logged out") {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("user"); // User data ও রিমুভ করা হচ্ছে
                                        window.location.href = "/login"; // Redirect
                                    }
                                } catch (error) {
                                    console.error("Error logging out:", error);
                                }
                            }}
                        >
                            <button><FontAwesomeIcon icon={faSignOutAlt} /></button>
                        </form>
                    </div>
                </div>

                {/* Sidebar & Main Content */}
                <div className="admin-content">
                    <div className={`admin-content-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>




                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faTachometerAlt} /></span>
                            <a href="/be" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Dashboard</a>
                        </div>
                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faSlidersH} /></span>
                            <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Sliders</a>
                        </div>
                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faHouseDamage} /></span>
                            <a href="/be/aids" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Aids</a>
                        </div>
                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faHandHoldingHeart} /></span>
                            <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Donations</a>
                        </div>
                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faUsers} /></span>
                            <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Volunteers</a>
                        </div>
                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faUsers} /></span>
                            <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Users</a>
                        </div>
                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faComments} /></span>
                            <a href="/be/sms" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Massages</a>
                        </div>
                        <div className="admin-content-sidebar-item">
                            <span><FontAwesomeIcon icon={faCog} /></span>
                            <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Settings</a>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="admin-content-main">

                        <div className="aid-control">
                            <h1>Training Centers</h1>
                            <form action="" onSubmit={submitHandeler}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name="title" value={title} onChange={titleChangeHandeler} placeholder="Enter Title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input type="text" value={location} onChange={locationChangeHandeler} placeholder="Enter location"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" id="description" name="description" value={description} onChange={descriptionChangeHandeler} placeholder="Enter Description"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="opening_hours">Opening Hours</label>
                                    <input type="time" id="opening_hours" name="opening_hours" value={opening_hours} onChange={opening_hoursChangeHandeler} placeholder="Enter Opening Hours"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="closing_hours">Closing Hours</label>
                                    <input type="time" id="closing_hours" name="closing_hours" value={closing_hours} onChange={closing_hoursChangeHandeler} placeholder="Enter Closing Hours"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="center_type">Center Type</label>
                                    <select id="center_type" name="center_type" value={center_type} onChange={(e) => setCenter_type(e.target.value)}>
                                        <option value="" disabled>Select Center Type</option>
                                        <option value="standard">Standard</option>
                                        <option value="comfort">Comfort</option>
                                        <option value="luxury">Luxury</option>
                                        <option value="premium">Premium</option>
                                        <option value="deluxe">Deluxe</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" onChange={imageChangeHandeler} />
                                    {image && <img src={URL.createObjectURL(image)} alt="image" width={200} height={200} />}
                                </div>

                                <div className="form-group-btn">

                                    <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="admin-footer">
                    <p>2021 RippleAid &copy; Copyright</p>
                </div>
            </div>
        </>
    );
};