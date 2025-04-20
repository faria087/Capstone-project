import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faAddressCard, faImages, faWater, faPaste, faChartLine, faBuilding, faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../Assests/Images/logo.jpeg";
import image2 from "../../Assests/Images/man.png";
import "./index.css";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

export const AdminPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
    const [contacts, setContacts] = useState([]);
    const [aids, setAids] = useState([]);
    const [landingcards, setLandingcards] = useState([]);
    const [showAll, setShowAll] = useState(false);


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




        const fetchContacts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/contacts");
                if (response.data.success) {
                    setContacts(response.data.data);
                    
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        const fetchAids = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/aids");
                if (response.data.success) {
                    setAids(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching aids:', error);
            }
        };

        const fetchLandingcards = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/landingcards");
                if (response.data.success) {
                    setLandingcards(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching landingcards:', error);
            }
        };




        fetchUsers();
        fetchContacts();
        fetchAids();
        fetchLandingcards();
    }, []);

    const totalAidsCount = aids.length;
    const totalLandingsCount = landingcards.length;

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const submitHandler = async (e, status, id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('status', status);

        try {
            const response = await axios.post(`http://localhost:8000/api/aids/status/${id}`, formData);
            if (response?.data?.success) {
                // Update the aids state directly
                setAids((prevAids) =>
                    prevAids.map((aid) =>
                        aid.id === id ? { ...aid, status } : aid
                    )
                );
                alert(`The request was ${status}.`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleSeeMore = () => {
        setShowAll(!showAll); // Toggle the showAll state
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
                        <div className="admin-content-main-content">
                            <div className="admin-content-main-content-item">
                                <h1>100 <sup>+</sup></h1>
                                <p>Donations</p>
                            </div>
                            <div className="admin-content-main-content-item">
                                <h1>{users.totalVolunteer}<sup>+</sup></h1>
                                <p>Volunteers</p>
                            </div>
                            <div className="admin-content-main-content-item">
                                <h1> {users.totalUser} <sup>+</sup></h1>
                                <p>Users</p>
                            </div>
                            <div className="admin-content-main-content-item">
                                <h1>{totalLandingsCount}<sup>+</sup></h1>
                                <p>Affected Areas</p>
                            </div>
                            <div className="admin-content-main-content-item">
                                <h1>{totalAidsCount}<sup>+</sup></h1>
                                <p>Ask For Aids</p>
                            </div>
                            <div className="admin-content-main-content-item">
                                <h1>0<sup>+</sup></h1>
                                <p>Training Center</p>
                            </div>
                        </div>

                        <div className="aid-control">
                            <h1>Manage Aids </h1>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Affected Type</th>
                                        <th>Aids</th>
                                        <th>Person Qty</th>
                                        <th>Contact Person</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(aids)}
                                    {(showAll ? aids : aids.slice(0, 4)).map((aid) => (
                                        <tr key={aid.id}>
                                            <td>{aid.landingcard?.title || 'N/A'}</td>

                                            <td>{aid.landingcard?.affected_type?.title || 'N/A'}</td>
                                            <td>{aid.aid}</td>
                                            <td>{aid.qty}</td>
                                            <td>{aid.name}</td>
                                            <td>{aid.phone}</td>
                                            <td>
                                                <span style={{
                                                    backgroundColor: aid.status === 'pending' ? 'blue' : aid.status === 'accepted' ? 'green' : 'red',
                                                    padding: '6px',
                                                    color: 'white',
                                                    marginTop: '15px'
                                                }}>{aid.status}</span>
                                            </td>


                                            <td className="aid-action-btn">
                                                {aid.status === 'accepted' ? (
                                                    // Only show the deny button if the status is accepted
                                                    <button onClick={(e) => submitHandler(e, 'denied', aid.id)} style={{ color: 'red' }}>
                                                        <FontAwesomeIcon icon={faTimesCircle} />
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button onClick={(e) => submitHandler(e, 'accepted', aid.id)}>
                                                            <FontAwesomeIcon icon={faCheckCircle} />
                                                        </button>
                                                        <button onClick={(e) => submitHandler(e, 'denied', aid.id)}>
                                                            <FontAwesomeIcon icon={faTimesCircle} />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={handleSeeMore} className="button" >
                        {showAll ? "See Less--" : "See More--"}
                    </button>
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
