import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt, faStoreAlt, faBuilding, faChartLine, faPaste, faImages, faWater, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";
import { Link } from "react-router-dom";
import "./index.css";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";


export const AboutEditPage = () => {
       const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
        const [user, setUser] = useState(null);
         const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });

         const toggleSidebar = () => {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        };

    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/api/abouts/${id}`);
            if (response?.data?.success) {
                setName(response?.data?.data?.name);
                setDesignation(response?.data?.data?.designation);
                setDescription(response?.data?.data?.description);
                setExistingImage(response?.data?.data?.image);
            }
        };
        fetchData();
        
    }, [id]);

   const nameChangeHandeler = (e) => {
        setName(e.target.value);
    };

    const designationChangeHandeler = (e) => {
        setDesignation(e.target.value);
    };

    const descriptionChangeHandeler = (e) => {
        setDescription(e.target.value);
    }
    const imageChangeHandeler = (e) => {
        setImage(e.target.files[0]);
    }

    
    const submitHandeler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('designation', designation);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        formData.append('_method', 'PUT');

        await axios.post(`http://localhost:8000/api/abouts/${id}`, formData)
            .then((response) => {
                if (response?.data?.success) {
                    navigate('/be/abouts')
                    toast.success('About updated successfully!', {
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
                                           <span><FontAwesomeIcon icon={faAddressCard} /></span>
                                           <a href="/be/abouts" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Abouts</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faWater} /></span>
                                           <a href="/be/affectedtypes" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Affected Type</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faHouseDamage} /></span>
                                           <a href="/be/affectedareas" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Affected Areas</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faImages} /></span>
                                           <a href="/be/gallaries" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Gallaries</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faPaste} /></span>
                                           <a href="/be/posts" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Posts</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faChartLine} /></span>
                                           <a href="/be/activities" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Activites</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faBuilding} /></span>
                                           <a href="/be/centers" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Centers</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faStoreAlt} /></span>
                                           <a href="/be/tcenters" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Training Centers</a>
                                       </div>
                                       <div className="admin-content-sidebar-item">
                                           <span><FontAwesomeIcon icon={faProductHunt} /></span>
                                           <a href="/be/products" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Products</a>
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
                            <h1>Edit Abouts </h1>
                            <form action="" onSubmit={submitHandeler}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" value={name} onChange={nameChangeHandeler} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="designation">Designation</label>
                                    <input type="text" id="designation" name="designation" value={designation} onChange={designationChangeHandeler} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" value={description} onChange={descriptionChangeHandeler} />
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

