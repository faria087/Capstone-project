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

export const PostCreatePage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [image, setImage] = React.useState();
    const [affectedtype_id, setAffectedTypeId] = React.useState('');
    const [affectedTypes, setAffectedTypes] = React.useState([]);


    const titleChangeHandeler = (e) => {
        setTitle(e.target.value);
    };

    const contentChangeHandeler = (e) => {
        setContent(e.target.value);
    };

    const imageChangeHandeler = (e) => {
        setImage(e.target.files[0]);
    };

    const affectedtype_idChangeHandeler = (e) => {
        setAffectedTypeId(e.target.value);
    };

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


    useEffect(() => {
        // Fetch affected types from the API
        const fetchAffectedTypes = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/affectedtypes");
                if (response?.data?.success) {
                    setAffectedTypes(response?.data?.data);
                }
            } catch (error) {
                console.error("Error fetching affected types:", error);
            }
        };

        fetchAffectedTypes();
    }, []);




    const submitHandeler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("affectedtype_id", affectedtype_id);
        formData.append("image", image);
        formData.append("user_id", user.id); // Assuming you have the user ID available
        formData.append('_method', 'POST');


        await axios.post('http://localhost:8000/api/posts', formData)
            .then((response) => {
                if (response?.data?.success) {
                    navigate(-1)
                }
            })
    }


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
                            <h1>Posts</h1>
                            <form action="" onSubmit={submitHandeler}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name="title" value={title} onChange={titleChangeHandeler} placeholder="Enter Title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="affected_type">Affected Type</label>
                                    <select value={affectedtype_id} onChange={affectedtype_idChangeHandeler} style={{ width: "100%", height: "40px" }}>
                                        <option value="" disabled >
                                            Select an affected type
                                        </option>
                                        {affectedTypes.map((affectedType) => (
                                            <option key={affectedType.id} value={affectedType.id}>
                                                {affectedType.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content</label>
                                    <input type="text" value={content} onChange={contentChangeHandeler} placeholder="Enter content"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" onChange={imageChangeHandeler} />
                                    {image && <img src={URL.createObjectURL(image)} alt="image" width={200} height={200} />}
                                </div>


                                <input type="hidden" name="user_id" value={user?.id || ''} />

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