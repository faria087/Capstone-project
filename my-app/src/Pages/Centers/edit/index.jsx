import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";
import { Link } from "react-router-dom";
import "./index.css";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CenterEditPage = () => {
       const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
        const [user, setUser] = useState(null);
         const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });

         const toggleSidebar = () => {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        };

    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/api/centers/${id}`);
            if (response?.data?.success) {
                setTitle(response?.data?.data?.title);
                setLocation(response?.data?.data?.location);
                setCapacity(response?.data?.data?.capacity);
                setExistingImage(response?.data?.data?.image);
            }
        };
        fetchData();
        
    }, [id]);

    const titleChangeHandeler = (e) => {
        setTitle(e.target.value);
    }
    const locationChangeHandeler = (e) => {
        setLocation(e.target.value);
    }
    const capacityChangeHandeler = (e) => {
        setCapacity(e.target.value);
    }
    const imageChangeHandeler = (e) => {
        setImage(e.target.files[0]);
    }

    
    const submitHandeler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('capacity', capacity);
        if (image) {
            formData.append('image', image);
        }
        formData.append('_method', 'PUT');

        await axios.post(`http://localhost:8000/api/centers/${id}`, formData)
            .then((response) => {
                if (response?.data?.success) {
                    navigate('/be/centers')
                    toast.success('Center updated successfully!', {
                        position: "top-right" // use string
                    });
                }
            })
    };

    return(
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
                            <a href="/be/sliders" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Sliders</a>
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
                            <h1>Edit Center </h1>
                            <form action="" onSubmit={submitHandeler}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name="title" value={title} onChange={titleChangeHandeler} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input type="text" id="location" name="location" value={location} onChange={locationChangeHandeler} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="capacity">Capacity</label>
                                    <input type="number" id="capacity" name="capacity" value={capacity} onChange={capacityChangeHandeler} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" onChange={imageChangeHandeler} />
                                    {image && <img src={URL.createObjectURL(image)} alt="preview" width={200} height={200} />}
                        {!image && existingImage && <img src={`http://localhost:8000/${existingImage}`} alt="existing" width={200} height={200} />}
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

