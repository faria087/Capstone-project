import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";


export const TCenterList = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
    const [tcenters, setTCenters] = useState([]);

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

        const fetchTCenters = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/tcenters");
                if (response.data.success) {
                    setTCenters(response.data.data);

                }
            } catch (error) {
                console.error('Error fetching centers:', error);
            }
        };

        fetchUsers();
        fetchTCenters();
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
        try {
            const response = await axios.delete(`http://localhost:8000/api/tcenters/${id}`);
            if (response.data.success) {
                setTCenters(tcenters.filter(tcenter => tcenter.id !== id)); // Remove the deleted tcenter from the state
                alert("tcenter deleted successfully!");
            }
        } catch (error) {
            console.error('Error deleting centers:', error);
        }
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
                        <a href="/be/tcenters-create" className="button">Add Training Centers</a>
                        <div className="aid-control" style={{width: "100%"}}>
                            <h1>Training Centers </h1>
                            <table style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>SL NO</th>
                                        <th>Title</th>
                                        <th>Location</th>
                                        <th style={{width:"30%"}}>Description</th>
                                        <th>Opening Hours</th>
                                        <th>Closing Hours</th>
                                        <th>Center Type</th>
                                        <th>Image</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    

                                    {Array.isArray(tcenters) && tcenters.length > 0 ? (
                                        tcenters.map((tcenter, index) => (
                                            <tr key={tcenter.id}>
                                                <td>{index + 1}</td>
                                                <td>{tcenter.title}</td>
                                                <td>{tcenter.location}</td>
                                                <td>{tcenter.description}</td>
                                                <td>{tcenter.opening_hours}</td>
                                                <td>{tcenter.closing_hours}</td>
                                                <td>{tcenter.center_type}</td>
                                                <td>
                                                    <img src={`http://localhost:8000/${tcenter.image}`} alt="tcenter" style={{ width: "100px", height: "100px" }} />
                                                </td>
                                                <td>{moment(tcenter?.created_at).fromNow()}</td>
                                                <td>
                                                    <Link
                                                        to={`/be/tcenters-edit/${tcenter.id}`}
                                                        style={{ background: "white", color: "black", width: "50px", height: "50px", padding: "15px", borderRadius: "50%", marginRight: "8px" }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteHandler(tcenter._id)}
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            background: "#fff",
                                                            borderRadius: "50%",
                                                            color: "black",
                                                            marginRight: "10px"
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            {/* <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                                                No centers available.
                                            </td> */}
                                            <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                                                No centers available.
                                            </td>
                                        </tr>
                                    )}

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
        </>
    );
};