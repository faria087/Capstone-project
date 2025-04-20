import React, { useState, useEffect } from "react";
import './index.css';
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faAddressCard, faImages, faWater, faPaste, faChartLine, faBuilding, faStoreAlt, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";
import { Link } from "react-router-dom";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

export const AboutList = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
    const [abouts, setAbouts] = useState([]);


    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                if (response.data.success) {
                    setUsers({
                        totalUser: response.data.totalUser,
                        totalVolunteer: response.data.totalVolunteer
                    });
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchAbouts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/abouts");
                if (response.data.success) {
                    setAbouts(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching landing cards:', error);
            }
        };

        fetchUsers();
        fetchAbouts();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const deleteHandler = async (id) => {
        await axios.delete(`http://localhost:8000/api/abouts/${id}`);
        const response = await axios.get("http://localhost:8000/api/abouts");
        if (response?.data?.success) {
            setAbouts(response?.data?.data);
        }
    };
    return (
        <div className="admin">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-header-img-bx">
                    <img src={image} alt="Logo" />
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
                    <a href="/be/about-create" className="button">Add About</a>
                    <div className="aid-control">
                        <h1>Abouts </h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>SL NO</th>
                                    <th>Name</th>
                                    <th style={{ width: "50%" }}>Description</th>
                                    <th>Image</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {abouts.map((about, index) => (
                                    <tr key={about._id}>
                                        <td>{index + 1}</td>
                                        <td>{about.name}</td>
                                        <td>{about.description}</td>
                                        <td>
                                            <img src={`http://localhost:8000/${about.image}`} alt="Landing Card" style={{ width: "100px", height: "100px" }} />
                                        </td>
                                        <td>{moment(about?.created_at).fromNow()}</td>
                                        <td >
                                            <Link to={`/be/aboutEdit/${about.id}`} style={{ background: "white", color: "black", width: "50px", height: "50px", padding: "15px", borderRadius: "50%", marginRight: "8px" }}><FontAwesomeIcon icon={faEdit} /></Link>
                                            <button style={{ background: "white", color: "black", width: "50px", height: "50px", padding: "15px", borderRadius: "50%" }} type="button" onClick={() => deleteHandler(about.id)} ><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="admin-footer">
                <p>2021 RippleAid &copy; Copyright</p>
            </div>
        </div>
    );
};
